using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using reactCore3A.ViewModel;

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

        private UserModel AuthenticateUser(UserModel login) 
        {
            UserModel user = null;

            if (login.userId == "abc" && login.mima == "def") {
                user = new UserModel {
                    userId = "abc",
                    mima = "xxx",
                    email = "abc@email.server"
                };
            }

            return user;
        }

        private string GenerateJsonWebToken(UserModel userInfo) 
        {  
            //var secerityKey = SymmetricSecurityKey();
            return "";
        }

        [HttpPost("[action]")]
        public IActionResult Login(string userId, string credential) 
        {
            UserModel login = new UserModel();
            login.userId = userId;
            login.mima = credential;

            var user = this.AuthenticateUser(login);

            if (user != null) {
                var token = GenerateJsonWebToken(user);
                return Ok(new { token });
            }

            return Unauthorized();
        }

        
    }
}  