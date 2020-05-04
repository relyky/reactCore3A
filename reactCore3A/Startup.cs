using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace reactCore3A
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
                options.AddPolicy("CorsPolicy", builder =>
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials().Build()));

            services.AddControllersWithViews();

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
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["Jwt:Key"]))
                    };
                });

            services.AddMvc();

            // 將 Session 存在 ASP.NET Core 記憶體中
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                // 沒必要將 Server 或網站技術的資訊爆露在外面，所以預設 Session 名稱 .AspNetCore.Session 可以改掉。
                options.Cookie.Name = ".AspNetCore.Session";
                // 修改合理的 Session 到期時間。預設是 20 分鐘沒有跟 Server 互動的 Request，就會將 Session 變成過期狀態。
                options.IdleTimeout = TimeSpan.FromMinutes(double.Parse(Configuration["Jwt:ExpireMinutes"]));
                // 限制只有在 HTTPS 連線的情況下，才允許使用 Session。如此一來變成加密連線，就不容易被攔截。
                options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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
            app.UseSession();

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();

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
