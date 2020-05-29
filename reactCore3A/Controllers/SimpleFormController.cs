using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using reactCore3A.Models;

namespace reactCore3A.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SimpleFormController : ControllerBase
    {
        private IConfiguration _config;
        private ISysEnv _env;
        public SimpleFormController(IConfiguration config, ISysEnv env)
        {
            _config = config;
            _env = env;
        }

        #region Local View Model 
        public class SimpleFormVM 
        {
            /// <summary>
            /// 識別名稱
            /// </summary>
            public string idname { get; set; }

            /// <summary>
            /// 生日
            /// </summary>
            public string birthday { get; set; }

            /// <summary>
            /// 自我介紹
            /// </summary>
            public string introduction { get; set; }

            /// <summary>
            /// 身高
            /// </summary>
            public int height { get; set; }

            /// <summary>
            /// 最後異動時間
            /// </summary>
            public DateTime? lastUpdDtm { get; set; }
        }
        #endregion

        /// <summary>
        /// SaveFormData
        /// </summary>
        [HttpPost("[action]")]
        public IActionResult SaveFormData(SimpleFormVM formData)
        {
            // 執行存檔
            formData.lastUpdDtm = DateTime.Now;
            return Ok(formData);
        }

        
    }
}
