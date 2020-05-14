using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Net.Http.Headers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using WcfBizService;

namespace reactCore3A.Models
{
    /// <summary>
    /// 將用於取用登入者資訊，統一取得所有環境參數等等
    /// </summary>
    public interface ISysEnv
    {
        /// <summary>
        /// current http context
        /// </summary>
        HttpContext Current { get; }

        /// <summary>
        /// current login user info
        /// </summary>
        UserModel LoginUser { get; }

        void SetLoginUserInfo(UserModel loginUser);
    }

    /// <summary>
    /// 將用於取用登入者資訊，環境參數等等
    /// </summary>
    public class SysEnv : ISysEnv
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IMemoryCache _cache;

        public SysEnv(IHttpContextAccessor httpContextAccessor, IMemoryCache cache)
        {
            _httpContextAccessor = httpContextAccessor;
            _cache = cache;
        }

        public HttpContext Current => _httpContextAccessor.HttpContext;

        public void SetLoginUserInfo(UserModel loginUser) {
            _cache.Set<string>(loginUser.userId, JsonConvert.SerializeObject(loginUser));
        }

        public UserModel LoginUser
        {
            get {
                var identity = Current.User.Identity as ClaimsIdentity;

                // 無登入資訊，離開
                if (identity == null) return null;

                // 解析登入資訊
                var claims = identity.Claims.ToDictionary<Claim, string, string>(
                    c => c.Properties.Count > 0 ? c.Properties.First().Value : c.Type,
                    c => c.Value);

                // 無登入資訊，離開
                if (claims.Count <= 0) return null;

                // 解析登入資訊 part 2
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

                UserModel user = JsonConvert.DeserializeObject<UserModel>(_cache.Get<string>(loginInfo.loginUserId));
                return user;
            }
        }
    }
}
