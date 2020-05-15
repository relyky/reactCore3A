using System;

namespace reactCore3A.Models
{
    [Serializable]
    public class LoginUserInfo
    {
        public string loginUserId { get; set; }
        public string loginUserName { get; set; }
        public string loginUserEmail { get; set; }
        public string loginUserRoles { get; set; }
        public Guid loginAuthUuid { get; set; }
        public DateTime loginAuthIssuedAt { get; set; }
        public DateTime loginAuthExpires { get; set; }
    }
}

