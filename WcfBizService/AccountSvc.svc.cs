using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.Text;

namespace WcfBizService
{
    // 注意: 您可以使用 [重構] 功能表上的 [重新命名] 命令同時變更程式碼、svc 和組態檔中的類別名稱 "AccountSvc"。
    // 注意: 若要啟動 WCF 測試用戶端以便測試此服務，請在 [方案總管] 中選取 AccountSvc.svc 或 AccountSvc.svc.cs，然後開始偵錯。
    public class AccountSvc : IAccountSvc
    {
        public string Echo(int knock)
        {
            return $"knock:{knock}@{DateTime.Now.ToString("HH:mm:ss")}";
        }

        public UserModel AuthenticateUser(LoginInfo login)
        {
            // 模擬登入檢查
            if (login.userId == "abc" && login.credential == "def")
            {
                UserModel user = new UserModel
                {
                    userId = "abc",
                    userName = "郝聰明",
                    mima = "xxx",
                    email = "abc@email.server",
                    roles = "Guest,User,Manager,Admin",
                    authGuid = Guid.NewGuid()
                };

                return user;
            }

            return null;
        }

    }
}
