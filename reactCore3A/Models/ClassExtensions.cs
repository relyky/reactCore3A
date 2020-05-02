using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace reactCore3A.Models
{
    public static class ClassExtensions
    {
        public static void SetObject(this ISession session, string key, object value)
        {
            session.Set(key, Utilities.SerializeToMemory(value));
        }

        public static T GetObject<T>(this ISession session, string key)
        {
            return Utilities.DeserializeFromMemory<T>(session.Get(key));
        }
    }
}
