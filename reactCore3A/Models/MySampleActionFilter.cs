using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace reactCore3A.Models
{
    public class MySampleActionFilter : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            Debug.WriteLine($">> OnActionExecuted of Method:{MethodBase.GetCurrentMethod()}, Request Path:{context.HttpContext.Request.Path}");
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            Debug.WriteLine($">> OnActionExecuting of Method:{MethodBase.GetCurrentMethod()}, Request Path:{context.HttpContext.Request.Path}");
        }
    }
}
