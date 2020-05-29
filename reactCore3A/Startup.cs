using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using reactCore3A.Models;
using System;
using System.Text;
using System.Threading.Tasks;

namespace reactCore3A
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
                options.AddPolicy("CorsPolicy", builder =>
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials().Build()));

            // 有這行 才能用 MVC
            services.AddControllersWithViews(options => {
                /// 全域加入 AntiforgeryToken 檢查
                options.Filters.Add(new AutoValidateAntiforgeryTokenAttribute());
            });

            // 設定 Antiforgery
            services.AddAntiforgery(options =>
            {
                // Set Cookie properties using CookieBuilder properties†.
                options.FormFieldName = "__RequestVerificationToken";
                options.HeaderName = "RequestVerificationToken";
                options.SuppressXFrameOptionsHeader = false;
                //options.Cookie.Name = ".AspNetCore.Antiforgery.ynF6Z8l01V0"
            });

            /// 從自訂元件中使用 HttpContext, ref→[https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/http-context?view=aspnetcore-3.1]
            /// 將可注入：IHttpContextAccessor，以取得HttpContext。
            services.AddHttpContextAccessor();

            /// 
            /// 允許Cookie-based 或 JWT-based 身份驗證, 以Cookie-based為預設
            /// 
            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options=> {
                    //## Cookie-based 身分驗證機制
                    options.LoginPath = new PathString("/Account/Login");
                    options.LogoutPath = new PathString("/Account/Logout");
                    options.ReturnUrlParameter = "ReturnUrl";
                    //用戶頁面停留太久，登入逾期，或Controller中用戶登入時機點也可以設定↓
                    options.ExpireTimeSpan = TimeSpan.FromMinutes(Configuration.GetValue<double>("Jwt:ExpireMinutes"));//沒給預設14天
                    //改變預設的導頁轉址行為，變成回應401 Unauthorized，即改變“/Account/Login?ReturnURL=xxxx”的行為。
                    options.Events.OnRedirectToLogin = (context) =>
                    {
                        // Disabling Automatic Challenge
                        context.Response.StatusCode = 401;
                        return Task.CompletedTask;
                    };
                })
                .AddJwtBearer(options =>
                {
                    //## JWT token based authentication

                    // 當驗證失敗時，回應標頭會包含 WWW-Authenticate 標頭，這裡會顯示失敗的詳細錯誤原因
                    options.IncludeErrorDetails = true; // 預設值為 true，有時會特別關閉

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        // 透過這項宣告，就可以從 "sub" 取值並設定給 User.Identity.Name
                        NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
                        // 透過這項宣告，就可以從 "roles" 取值，並可讓 [Authorize] 判斷角色
                        RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",

                        // 一般我們都會驗證 Issuer
                        ValidateIssuer = true,
                        ValidIssuer = Configuration["Jwt:Issuer"],

                        // 通常不太需要驗證 Audience
                        ValidateAudience = false,
                        ValidAudience = Configuration["Jwt:Issuer"],

                        // 一般我們都會驗證 Token 的有效期間
                        ValidateLifetime = true,

                        // 如果 Token 中包含 key 才需要驗證，一般都只有簽章而已
                        ValidateIssuerSigningKey = false,

                        // "1234567890123456" 應該從 IConfiguration 取得
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Jwt:Key"])),
                    };
                });

            //services.AddMvc(); //<--- Core 2.2的東西

            #region 不使用Core3.1的Session
            ///
            ///# 不使用Session，因為Core3.1的Session實作不完整，一般也不建意使用。
            /// 一定要用Session請參考：[鐵人賽 Day20] ASP.NET Core 2 系列 - 快取機制及 Redis Session(https://blog.johnwu.cc/article/ironman-day20-asp-net-core-caching-redis-session.html)
            /// [ASP.NET Core 中的分散式快取](https://docs.microsoft.com/zh-tw/aspnet/core/performance/caching/distributed?view=aspnetcore-3.1)
            ///

            ////# 將 Session 存在 ASP.NET Core 記憶體中
            //services.AddDistributedMemoryCache();
            //services.AddSession(options =>
            //{
            //    // 沒必要將 Server 或網站技術的資訊爆露在外面，所以預設 Session 名稱 .AspNetCore.Session 可以改掉。
            //    options.Cookie.Name = ".AspNetCore.Session";
            //    // 修改合理的 Session 到期時間。預設是 20 分鐘沒有跟 Server 互動的 Request，就會將 Session 變成過期狀態。
            //    options.IdleTimeout = TimeSpan.FromMinutes(double.Parse(Configuration["Jwt:ExpireMinutes"]));
            //    // 限制只有在 HTTPS 連線的情況下，才允許使用 Session。如此一來變成加密連線，就不容易被攔截。
            //    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            //    options.Cookie.IsEssential = true;
            //});
            #endregion

            /// 本機快取，使可注入：IMemoryCache。將應用於取代Session存放登入者資訊。
            services.AddMemoryCache();

            /// 注入自訂物件, 註冊DI(Dependency Injection)服務
            /// 將用於取用登入者資訊，環境參數等等。為原Session的替代方案。
            services.AddSingleton<ISysEnv, SysEnv>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IAntiforgery antiforgery)
        {
            /// 使用 IApplicationBuilder 建立中介軟體管線
            /// [中介軟體順序](https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1#middleware-order)

            // 以下順序不可隨意變更
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
            }

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseCookiePolicy();

            #region 不使用Core3.1的Session
            ///# 不使用Session，因為Core3.1的Session實作不完整，一般也不建意使用。
            ////// 一定要用Session請參考：[鐵人賽 Day20] ASP.NET Core 2 系列 - 快取機制及 Redis Session(https://blog.johnwu.cc/article/ironman-day20-asp-net-core-caching-redis-session.html)
            //app.UseSession(); 
            #endregion

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            
            // custom middleware
            app.UseMiddleware<MyMiddleware>();

            // 使用 IAntiforgery 設定 antiforgery 功能
            app.Use(next => context =>
            {
                var tokens = antiforgery.GetAndStoreTokens(context);
                context.Response.Cookies.Append(tokens.FormFieldName, tokens.RequestToken,
                    new CookieOptions() { HttpOnly = false });

                return next(context);
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });
            
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

        }
    }
}
