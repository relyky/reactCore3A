using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using reactCore3A.ViewModel;
using Microsoft.AspNetCore.Authorization;
using reactCore3A.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.CodeAnalysis.Options;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc;
using WcfBizService;
using Microsoft.Extensions.Logging;

namespace reactCore3A.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private IConfiguration _config;
        private ISysEnv _env;
        private ILogger _logger;

        public AccountController(IConfiguration config, ISysEnv env, ILogger<AccountController> logger)
        {
            _config = config;
            _env = env;
            _logger = logger;
        }

        /// <summary>
        /// JWT-base authorization
        /// </summary>
        private string GenerateJsonWebToken(UserModel userInfo)
        {
            // 聲名：依登入人員資訊填入
            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.userId),
                new Claim(JwtRegisteredClaimNames.GivenName, userInfo.userName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.email),
                new Claim(JwtRegisteredClaimNames.Jti, userInfo.authGuid.ToString()),
                new Claim("roles", userInfo.roles) // 自訂聲名欄位 
            };

            // 建立一組對稱式加密的金鑰，主要用於 JWT 簽章之用
            // HmacSha256 有要求必須要大於 128 bits，所以 key 不能太短，至少要 16 字元以上
            var securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_config["Jwt:Key"]));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            // 計算有效時間
            DateTime now = DateTime.Now;
            DateTime expires = now.AddMinutes(_config.GetValue<double>("Jwt:ExpireMinutes"));

            // 建立 SecurityTokenDescriptor
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _config["Jwt:Issuer"],
                Audience = _config["Jwt:Issuer"], // 由於你的 API 受眾通常沒有區分特別對象，因此通常不太需要設定，也不太需要驗證
                NotBefore = now, // 預設值就是 DateTime.Now
                IssuedAt = now, // 預設值就是 DateTime.Now
                Subject = new ClaimsIdentity(claims),
                Expires = expires,
                SigningCredentials = signingCredentials
            };

            // 產出所需要的 JWT securityToken 物件，並取得序列化後的 Token 結果(字串格式)
            var tokenHandler = new JwtSecurityTokenHandler();
            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            var serializeToken = tokenHandler.WriteToken(securityToken);

            return serializeToken;
        }

        /// <summary>
        /// Cookie-base authorization
        /// </summary
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

        /// <summary>
        /// Cookie-based 身分驗證機制
        /// </summary>
        [HttpPost("[action]")]
        public IActionResult Login(LoginInfo login)
        {
            _logger.LogInformation($"Login {login.ToJson()}");

            var accSvc = _env.CreateAccountSvcClient();
            string accSvcUrl = accSvc.Endpoint.Address.Uri.ToString();
            _logger.LogTrace("認證網址：{accSvcUrl}。", accSvcUrl);

            UserModel user = accSvc.AuthenticateUser(login);
            if (user != null)
            {
                _env.SetLoginUserInfo(user);
                this.SigninWithCookieAuth(user);
                return Ok();
            }

            accSvc.CloseAsync();
            return Unauthorized();
        }

        [HttpPost("[action]")]
        public IActionResult Logout()
        {
            this.HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme).Wait();
            return Ok(new LastErrMsg("已登出系統", LastErrMsg.SUCCESS));
        }

        /// <summary>
        /// JWT token based authentication
        /// </summary>
        [HttpPost("[action]")]
        public IActionResult RequestBearer(LoginInfo login)
        {
            var accSvc = _env.CreateAccountSvcClient();
            UserModel user = accSvc.AuthenticateUser(login);

            if (user != null)
            {
                var token = GenerateJsonWebToken(user);
                return Ok(token);
            }

            accSvc.CloseAsync();
            return Unauthorized();
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult GetLoginInfo()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            //var claimList = identity.Claims.ToList();
            var claims = identity.Claims.ToDictionary<Claim, string, string>(
                c => c.Properties.Count > 0 ? c.Properties.First().Value : c.Type,
                c => c.Value);

            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            DateTime iat = origin.AddSeconds(double.Parse(claims["iat"]));
            DateTime exp = origin.AddSeconds(double.Parse(claims["exp"]));

            var loginInfo = new
            {
                loginUserId = claims["sub"],
                loginUserName = claims["given_name"],
                loginUserEmail = claims["email"],
                loginUserRoles = claims["roles"],
                loginAuthUuid = claims["jti"],
                loginAuthIssuedAt = iat.ToLocalTime().ToString("yyyy\\/MM\\/dd HH:mm:ss"),
                loginAuthExpires = exp.ToLocalTime().ToString("yyyy\\/MM\\/dd HH:mm:ss")
            };

            return Ok(loginInfo);
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult RefreshCookie()
        {
            List<KeyValuePair<string, string>> cookieList = new List<KeyValuePair<string, string>>();
            foreach (var cookie in Request.Cookies)
            {
                cookieList.Add(cookie);
            }

            string testcookie1 = DateTime.Now.ToString("HH:mm:ss");
            Response.Cookies.Append("testcookie1", testcookie1);

            return Ok(new { testcookie1 });
            //return Ok(cookieList); //<---cookie將跟隨封包回browser。
        }

        /// <summary>
        /// for tseting
        /// </summary>
        [Authorize]
        [HttpPost("[action]")]
        public IEnumerable<string> GetValues()
        {
            return new string[] { "Foo", "Bar", "Baz", "今天天氣真好。" };
        }
    }
}