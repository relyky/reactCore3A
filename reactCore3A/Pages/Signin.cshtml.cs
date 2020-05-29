using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Configuration;
using reactCore3A.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using WcfBizService;

namespace reactCore3A.Pages
{
    public class SigninModel : PageModel
    {
        private IConfiguration _config;
        private ISysEnv _env;
        public SigninModel(IConfiguration config, ISysEnv env)
        {
            _config = config;
            _env = env;
        }

        /// <summary>
        /// Cookie-base authorization
        /// </summary>
        private void SigninWithCookieAuth(UserModel userInfo)
        {
            // 計算有效時間
            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            DateTime now = DateTime.UtcNow;
            DateTime expires = now.AddMinutes(_config.GetValue<double>("Jwt:ExpireMinutes"));

            double iat = Math.Floor(now.Subtract(origin).TotalSeconds);
            double exp = Math.Floor(expires.Subtract(origin).TotalSeconds);

            // 聲名：依登入人員資訊填入
            var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, userInfo.userId),
                    new Claim(JwtRegisteredClaimNames.GivenName, userInfo.userName),
                    new Claim(JwtRegisteredClaimNames.Email, userInfo.email),
                    new Claim(JwtRegisteredClaimNames.Jti, userInfo.authGuid.ToString()),
                    new Claim("roles", userInfo.roles), // 自訂聲名欄位 
                    new Claim("iat", iat.ToString()),
                    new Claim("exp", exp.ToString())
                };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = false,
                ExpiresUtc = new DateTimeOffset(expires),
                //AllowRefresh = <bool>,
                //IssuedUtc = new DateTimeOffset(now),
                //RedirectUri = <string>
            };

            this.HttpContext.SignInAsync(new ClaimsPrincipal(claimsIdentity), authProperties).Wait();
        }

        public IActionResult OnGet()
        {
            return Page();
        }

        [BindProperty]
        public LoginInfo LoginInfo { get; set; }

        public IActionResult OnPost()
        {
            if (!ModelState.IsValid)
            {
                ViewData["Message"] = "格式錯誤";
                return Page();
                //return RedirectToPage("./Error");
            }

            var accSvc = new AccountSvcClient();

            UserModel user = accSvc.AuthenticateUser(LoginInfo);
            if (user != null)
            {
                _env.SetLoginUserInfo(user);
                this.SigninWithCookieAuth(user);

                // success
                return Redirect("~/index");
            }

            accSvc.CloseAsync();
            ViewData["Message"] = "登入失敗!";
            return Page();
        }
    }
}