using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace reactCore3A.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonDataController : ControllerBase
    {
        [HttpPost]
        [Route("[Action]")]
        public Dictionary<string, string> GetWeekList(GetWeekListArgs args)
        {
            Dictionary<string, string> codeList = new Dictionary<string, string>();

            if (args.type == "E")
            {
                codeList.Add("1", "Monday");
                codeList.Add("2", "Tuesday");
                codeList.Add("3", "Wednesday");
                codeList.Add("4", "Thursday");
                codeList.Add("5", "Friday");
                codeList.Add("6", "Saturday");
                codeList.Add("7", "Sunday");
                Debug.WriteLine("GetWeekList(E)");
            }
            else if (args.type == "C")
            {
                codeList.Add("1", "星期一");
                codeList.Add("2", "星期二");
                codeList.Add("3", "星期三");
                codeList.Add("4", "星期四");
                codeList.Add("5", "星期五");
                codeList.Add("6", "星期六");
                codeList.Add("7", "星期七");
                Debug.WriteLine("GetWeekList(C)");
            }
            else 
            {
                throw new Exception("參數只允許C或E。");
            }

            return codeList;
        }

        public class GetWeekListArgs
        {
            public string type { get; set; }
        }
    }
}