using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfBizService
{
    // 注意: 您可以使用 [重構] 功能表上的 [重新命名] 命令同時變更程式碼和組態檔中的介面名稱 "IAccountSvc"。
    [ServiceContract]
    public interface IAccountSvc
    {
        [OperationContract]
        string Echo(int knock);

        [OperationContract]
        UserModel AuthenticateUser(LoginInfo login);
    }

    [DataContract]
    public class LoginInfo
    {
        [DataMember]
        public string userId { get; set; }
        [DataMember]
        public string credential { get; set; }
    }

    [DataContract]
    public class UserModel
    {
        [DataMember]
        public string userId { get; set; }
        [DataMember]
        public string userName { get; set; }
        [DataMember]
        public string mima { get; set; }
        [DataMember]
        public string email { get; set; }
        [DataMember]
        public string roles { get; set; }
        [DataMember]
        public Guid authGuid { get; set; }
    }
}
