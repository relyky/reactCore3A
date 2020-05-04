using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;

namespace reactCore3A.ViewModel
{
    ///自訂錯誤訊息元件，繼承 Error 物件。
    //export function LastErrMsg(errMsg, errType, errDtm, errClass, errMsgDetailList)
    //{
    //    //console.info('new LastErrMsg', { errMsg, errType, errDtm, errClass, errMsgDetailList })
    //
    //    this.errType = errType || 'ERROR';  // [SUCCESS, WARNING, ERROR, FAIL, EXCEPTION]
    //    this.errMsg = errMsg || '預設失敗。';
    //    this.errDtm = errDtm || new Date(); // 還是用字串？
    //    this.errClass = errClass || null;
    //    this.errMsgDetailList = errMsgDetailList || undefined; // 進階應用，錯誤訊息明細清單，預計用於表單輸入檢查。
    //
    //    // base data member of Error
    //    this.name = this.errType;
    //    this.message = this.errMsg;
    //}

    public class LastErrMsg
    {
        #region String Enum of errType
        public const string SUCCESS = "SUCCESS";
        public const string WARNING = "WARNING";
        public const string ERROR = "ERROR";
        public const string FAIL = "FAIL";
        public const string EXCEPTION = "EXCEPTION";
        #endregion

        #region properties
        public string errType { get; set; }
        //public ErrTypeEnum errType { get; set; }
        public string errMsg { get; set; }
        public DateTime errDtm { get; set; }
        public string errClass { get; set; }
        public Dictionary<string,string> errMsgDetailList { get; set; }
        #endregion

        public LastErrMsg(string errMsg, string errType = ERROR) {
            this.errType = errType;
            this.errMsg = errMsg;
            this.errDtm = DateTime.Now;
        }
    }

}
