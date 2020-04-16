import swal from 'sweetalert2'

/// 應用範例
/// import { LastErrMsg, unboxLastErrMsg, showLastErrMsg } from 'Common/LastErrMsg'
///
/// 非同步 postData()
/// postData(apiName, args).then(data=>{
///     assignProps(data)
/// }).catch(err=>{
///     showLastErrMsg(err)
/// })
///
/// 同步 postData()
/// try {
///     const data1 = await postData('ApiName1',args1)
///     const data2 = await postData('ApiName2',args2)
///     const data3 = await postData('ApiName3',args3)
///
///     throw new LastErrMsg('測試測試測試', 'info')
///     throw new Error('我錯了') // 也支援Erro類型
/// }
/// catch (ex) {
///     showLastErrMsg(ex)
/// }
///

///自訂錯誤訊息元件，繼承 Error 物件。
export function LastErrMsg(errMsg, errType, errDtm, errClass, errMsgDetailList) {
    //console.info('new LastErrMsg', { errMsg, errType, errDtm, errClass, errMsgDetailList })

    this.errType = errType || 'ERROR';  // [SUCCESS, WARNING, ERROR, FAIL, EXCEPTION]
    this.errMsg = errMsg || '預設失敗。';
    this.errDtm = errDtm || new Date(); // 還是用字串？
    this.errClass = errClass || null;
    this.errMsgDetailList = errMsgDetailList || undefined; // 進階應用，錯誤訊息明細清單，預計用於表單輸入檢查。

    // base data member of Error
    this.name = this.errType;
    this.message = this.errMsg;
}
LastErrMsg.prototype = Object.create(Error.prototype);
LastErrMsg.prototype.constructor = LastErrMsg;

/// 檢查回傳物件(resp.data)是否為 LastErrMsg 並轉換它。
export function unboxLastErrMsg(respData) {
    //console.log('unboxLastErrMsg', { respData })

    /// 若符合 LastErrMsg 格式則回傳 LastErrMsg 物件，
    if (typeof respData === 'object' && typeof respData.errType === 'string' && typeof respData.errMsg === 'string') {
        const { errType, errMsg, errDtm, errClass, errMsgDetailList } = respData;
        const lastErr = new LastErrMsg(errMsg, errType, errDtm, errClass, errMsgDetailList);
        return lastErr;
    }

    /// errMsgDetailList 範例
    /// errMsgDetailList: {
    ///   formSn: "表單序號 欄位是必要項。"
    ///   insuranceNum: "保險證字號 欄位是必要項。"
    ///   accNum: "轉帳帳號 欄位是必要項。"
    /// }

    // 否則回傳 null。
    return null;
}

/// parse and show the exception error message.
export function showLastErrMsg(lastErr) {
    /// 若符合 LastErrMsg 格式則回傳 LastErrMsg 物件
    if (lastErr instanceof LastErrMsg) {
        //console.log('[lastErr instanceof LastErrMsg]', { lastErr })

        /// 進階應用，有訊息明細清單
        if (typeof lastErr.errMsgDetailList === 'object') {
            //console.log('[lastErr 有 errMsgDetailList]', { lastErr })

            //const htmlMessage = JSON.stringify(lastErr.errMsgDetailList)
            const htmlMessage = `<p>${lastErr.errMsg}</p>`.concat('<ul style="text-align:left">', ...Object.values(lastErr.errMsgDetailList).map(msg => `<li>${msg}</li>`), '</ul>')

            /// errMsgDetailList 範例
            /// errMsgDetailList: {
            ///   formSn: "表單序號 欄位是必要項。"
            ///   insuranceNum: "保險證字號 欄位是必要項。"
            ///   accNum: "轉帳帳號 欄位是必要項。"
            /// }

            swal.fire({
                icon: mapIcon(lastErr.errType), /// 官方文件是 "icon"，實際上是"type"
                title: lastErr.errType,
                text: lastErr.errMsg,
                html: htmlMessage
            })
        }
        else {
            //console.log('[lastErr 一般]', { lastErr })
            swal.fire({
                icon: mapIcon(lastErr.errType), /// 官方文件是 "icon"，實際上是"type"
                title: lastErr.errType,
                text: lastErr.errMsg
            })
        }
    }
    else if (lastErr instanceof Error) {
        //console.log('lastErr instanceof Error', { lastErr })
        swal.fire({
            title: lastErr.name,
            text: lastErr.message
        })
    }
    else {
        swal.fire({
            title: 'Unkonw...',
            text: JSON.stringify(lastErr)
        })
    }
}

/// helper: mapping dictionary
function mapIcon(errType) {
    // "success", "error", "warning", "info" or "question",
    const err2Icon = {
        SUCCESS: 'success',
        WARNING: 'warning',
        ERROR: 'error',
        FAIL: 'error',
        EXCEPTION: 'error',
        INFO: 'info'
    }
    const icon = err2Icon[errType] || 'error' // errType
    return icon
}