using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace reactCore3A.Models
{
    public class MyAuditActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuted(ActionExecutedContext context)
        {
            base.OnActionExecuted(context);
            Debug.WriteLine($">> OnActionExecuted of Method:{MethodBase.GetCurrentMethod()}, Request Path:{context.HttpContext.Request.Path}");
        }

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            base.OnActionExecuting(context);
            Debug.WriteLine($"Audit >> Method:{MethodBase.GetCurrentMethod()} {Environment.NewLine}" +
                $", RequestPath: {context.HttpContext.Request.Path} {Environment.NewLine}" +
                $", RequestArgs: {JsonConvert.SerializeObject(context.ActionArguments)}");
        }
    }
}
