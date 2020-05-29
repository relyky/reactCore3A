using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Net.Mime;
using System.Threading.Tasks;

namespace reactCore3A.Models
{
    /// <summary>
    /// 中介軟體(ASP.NET Core middleware)
    /// </summary>
    /// <see cref="ASP.NET Core 中介軟體(https://docs.microsoft.com/zh-tw/aspnet/core/fundamentals/middleware/?view=aspnetcore-3.1)"/>
    public class MyMiddleware
    {
        private readonly RequestDelegate _next;

        public MyMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            //## Do something with context near the beginning of request processing.
            Debug.WriteLine("MyMiddleware.OnInvoke");
            // NLog.Trace....

            //## GO
            await _next.Invoke(context);

            //## Clean up.
        }
    }
}
