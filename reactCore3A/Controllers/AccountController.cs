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

namespace reactCore3A.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        //[HttpPost]
        //[Route("[action]")]
        //public IActionResult Authenticate(string userId, string credential)
        //{
        //    return Ok(new LastErrMsg("登入成功。", LastErrMsg.SUCCESS));
        //    //var msg = new LastErrMsg("我出運了。");
        //    //msg.errMsgDetailList = new Dictionary<string, string>();
        //    //msg.errMsgDetailList.Add("aaa", "AAAAA");
        //    //msg.errMsgDetailList.Add("bbb", "BBBBB");
        //    //return Ok(msg);
        //}

        private IConfiguration _config;

        public AccountController(IConfiguration config)
        {
            _config = config;
        }

        private UserModel AuthenticateUser(LoginInfo login)
        {
            UserModel user = null;

            if (login.userId == "abc" && login.credential == "def")
            {
                user = new UserModel
                {
                    userId = "abc",
                    userName = "郝聰明",
                    mima = "xxx",
                    email = "abc@email.server"
                };
            }

            return user;
        }

        private string GenerateJsonWebToken(UserModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            DateTime notBefore = DateTime.UtcNow;
            DateTime expires = _config["Jwt:ExpireMinutes"] != null
                ? notBefore.AddMinutes(double.Parse(_config["Jwt:ExpireMinutes"]))
                : notBefore.AddMinutes(30);

            var claims = new[] {
                new Claim(JwtRegisteredClaimNames.Sub, userInfo.userId),
                new Claim(JwtRegisteredClaimNames.GivenName, userInfo.userName),
                new Claim(JwtRegisteredClaimNames.Email, userInfo.email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Issuer"],
                claims,
                notBefore,
                expires,
                signingCredentials);

            string encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
            return encodedToken;
        }

        [HttpPost("[action]")]
        public IActionResult Login(LoginInfo login)
        {
            var user = this.AuthenticateUser(login);

            if (user != null)
            {
                var token = GenerateJsonWebToken(user);
                return Ok(new { token });
            }

            return Unauthorized();
        }

        [Authorize]
        [HttpPost("[action]")]
        public IActionResult GetLoginInfo() 
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            var claimList = identity.Claims.ToList();

            DateTime origin = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc);
            DateTime iss = origin.AddSeconds(double.Parse(claimList[4].Value));
            DateTime exp = origin.AddSeconds(double.Parse(claimList[5].Value));

            var loginInfo = new {
                loginUserId = claimList[0].Value,
                loginUserName= claimList[1].Value,
                loginUserEmail = claimList[2].Value,
                loginAuthUuid = claimList[3].Value,
                loginAuthTime = iss.ToLocalTime().ToString("yyyy\\/MM\\/dd HH:mm:ss"),
                loginAuthExpires = exp.ToLocalTime().ToString("yyyy\\/MM\\/dd HH:mm:ss")
            };

            return Ok(loginInfo);
        }

        /// <summary>
        /// for tseting
        /// </summary>
        /// <returns></returns>
        [Authorize]
        [HttpPost("[action]")]
        public IEnumerable<string> GetValues() 
        {
            return new string[] {"Foo","Bar","Baz","今天天氣真好。" };
        }

    }
}