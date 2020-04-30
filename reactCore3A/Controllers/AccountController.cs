using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using reactCore3A.ViewModel;

namespace reactCore3A.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        [HttpPost]
        [Route("[action]")]
        public IActionResult Authenticate(string userId, string credential)
        {
            return Ok(new LastErrMsg("登入成功。", LastErrMsg.SUCCESS));

            //var msg = new LastErrMsg("我出運了。");
            //msg.errMsgDetailList = new Dictionary<string, string>();
            //msg.errMsgDetailList.Add("aaa", "AAAAA");
            //msg.errMsgDetailList.Add("bbb", "BBBBB");
            //return Ok(msg);
        }
    }
}