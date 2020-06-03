import { useState } from 'react'
import axios from 'axios'
import t from 'typy'
import { LastErrMsg, unboxLastErrMsg, showLastErrMsg } from 'Common/LastErrMsg'
import { useStoreActions } from 'store/store.js'

/// # 規格
/// const [{ postData, downloadFile, uploadFile }, f_loading] = usePostData({ baseUrl:'/area/controller', blockui:true, trace:false, msgBox: true })
/// postData('apiName', args).then((data) => { ... })
/// postData('/area/controller/apiName', args).then((data) => { ... })
/// downloadFile('http://full_url/addr', args).then((fileBlob) => { ... })
///
/// # 應用範例
/// const [{ postData}, f_loading] = usePostData({baseUrl: '/area/controller'})
/// const [formData, {assignProps}] = useFormData()
///
/// postData('QryDataList', args).then(data => {
///    assignProps(data)
/// })
///
/// # 應用範例 download file
/// import { saveAs } from 'file-saver'
/// const [{ downloadFile }, f_loading] = usePostData({ baseUrl: '/ETAPSYS/ETAPTxnLog' })
/// 
/// downloadFile('ExportTxnLog', qryArgs, { blockui:false, trace:true }).then(fileBlob => {
///    saveAs(fileBlob, 'TxnLog.xlsx')
/// })

/// resource ------------------------------------------------------------------

/// helper function: 判定/組織 api url
function determineApiUrl(baseUrl, apiName) {
    const url = apiName.startsWith('/') || apiName.startsWith('http://') || apiName.startsWith('https://') ? apiName // full url
        : t(baseUrl).isString ? `${baseUrl}/${apiName}`
        : apiName;
    return url;
}

/// ---------------------------------------------------------------------------
export default function usePostData(options) {
    // 預設選項
    const initOptions = {
        baseUrl: null,
        blockui: true, // 鎖住畫面
        trace: false,  // tracing
        msgBox: true,  // 顯示訊息框
        ...options
    }

    const { setBlocking } = useStoreActions()
    const [f_loading, setLoadingFlag] = useState(false)

    /// Do ajax post data request
    function postData(apiName, args, options) {
        if (!t(apiName).isString) throw new Error('Invalid value type!')
        if (!(t(args).isNullOrUndefined || t(args).isObject)) throw new Error('Invalid value type!')

        // 取得參數
        const { baseUrl, blockui, trace, msgBox } = { ...initOptions, ...options }

        setLoadingFlag(true)
        blockui && setBlocking(true)

        // 組織 api url
        const url = determineApiUrl(baseUrl, apiName)

        // Go
        trace && console.log('postData', { url, args })
        return Promise.resolve(axios.post(url, args)).then(resp => {
            //debugger
            const { data } = resp
            const lastErr = unboxLastErrMsg(data) // is LastErrMsg?
            if (lastErr instanceof LastErrMsg) {
                trace && console.info('postData LastErrMsg', { lastErr })

                // 非"SUCCCESS"算失敗！
                if (lastErr.errType !== 'SUCCESS')
                    throw lastErr;

                msgBox && showLastErrMsg(lastErr)

                return lastErr;
            } else {
                trace && console.info('postData SUCCESS', { data })
                // success
                return data;
            }
        }).catch((xhr) => {
            //debugger
            trace && console.error('postData FAIL!', { xhr })

            const lastErr = (xhr instanceof LastErrMsg) ? xhr
                : new LastErrMsg(xhr.message, 'EXCEPTION', new Date(), null);
            //const lastErr = { errType: 'EXCEPTION', errMsg: xhr.message, errDtm: new Date(), errClass: null }

            msgBox && showLastErrMsg(lastErr)

            throw lastErr; // 必需把錯誤再丟出去，不然會被判定為"成功"
        }).finally(() => {
            setLoadingFlag(false)
            blockui && setBlocking(false)
        })
    }

    /// Do ajax upload a file request
    /// function uploadFile(apiName, args) { ... }

    /// Do ajax download a file request 
    function downloadFile(apiName, args, options) {
        if (!t(apiName).isString) throw new Error('Invalid value type!')
        if (!(t(args).isNullOrUndefined || t(args).isObject)) throw new Error('Invalid value type!')

        // 取得參數
        const { baseUrl, blockui, trace, msgBox } = { ...initOptions, ...options }

        setLoadingFlag(true)
        blockui && setBlocking(true)

        // 組織 api url
        const url = determineApiUrl(baseUrl, apiName)

        // Go
        trace && console.log('downloadFile', { url, args })
        const config = { responseType: 'blob' } // ※ 與postData 應該只差這個 config 不同
        return Promise.resolve(axios.post(url, args, config)).then(resp => {
            const { data } = resp
            const lastErr = unboxLastErrMsg(data) // is LastErrMsg?
            if (lastErr instanceof LastErrMsg) {
                trace && console.info('downloadFile LastErrMsg', { lastErr })

                // 非"SUCCCESS"算失敗！
                if (lastErr.errType !== 'SUCCESS')
                    throw lastErr;

                msgBox && showLastErrMsg(lastErr)

                return lastErr;
            } else {
                trace && console.info('downloadFile SUCCESS')
                // success
                return data; // a file blob
            }
        }).catch((xhr) => {
            trace && console.error('downloadFile FAIL!', { xhr })

            const lastErr = (xhr instanceof LastErrMsg) ? xhr
                : new LastErrMsg(xhr.message, 'EXCEPTION', new Date(), null);
            //const lastErr = { errType: 'EXCEPTION', errMsg: xhr.message, errDtm: new Date(), errClass: null }

            msgBox && showLastErrMsg(lastErr)

            throw lastErr; // 必需把錯誤再丟出去，不然會被判定為"成功"
        }).finally(() => {
            setLoadingFlag(false)
            blockui && setBlocking(false)
        })
    }

    /// Do ajax post file request
    function uploadFile(apiName, formData /* FormData */, options) {
        if (!t(apiName).isString) throw new Error('Invalid value type!')
        if (!(formData instanceof FormData)) throw new Error('Invalid FormData type!')
        /// ※ 檔案上傳用FormData封包實作，例：
        /// const formData = new FormData()
        /// formData.append('note', '我是檔案說明。')
        /// formData.append('file', inputFileRef.current.files[0])

        // 取得參數
        const { baseUrl, blockui, trace, msgBox } = { ...initOptions, ...options }

        setLoadingFlag(true)
        blockui && setBlocking(true)

        // 組織 api url
        const url = determineApiUrl(baseUrl, apiName)

        // Go
        trace && console.log('uploadFile', { url, formData })
        const config = { headers: { 'content-type': 'multipart/form-data' } } // ※ 與postData 應該只差 config 與 args 不同
        return Promise.resolve(axios.post(url, formData, config)).then(resp => {
            const { data } = resp
            const lastErr = unboxLastErrMsg(data) // is LastErrMsg?
            if (lastErr instanceof LastErrMsg) {
                trace && console.info('uploadFile LastErrMsg', { lastErr })

                // 非"SUCCCESS"算失敗！
                if (lastErr.errType !== 'SUCCESS')
                    throw lastErr;

                msgBox && showLastErrMsg(lastErr)

                return lastErr;
            } else {
                trace && console.info('uploadFile SUCCESS', { data })
                // success
                return data;
            }
        }).catch((xhr) => {
            trace && console.error('uploadFile FAIL!', { xhr })

            const lastErr = (xhr instanceof LastErrMsg) ? xhr
                : new LastErrMsg(xhr.message, 'EXCEPTION', new Date(), null);
            //const lastErr = { errType: 'EXCEPTION', errMsg: xhr.message, errDtm: new Date(), errClass: null }

            msgBox && showLastErrMsg(lastErr)

            throw lastErr; // 必需把錯誤再丟出去，不然會被判定為"成功"
        }).finally(() => {
            setLoadingFlag(false)
            blockui && setBlocking(false)
        })
    }

    // return Hooks
    return [{ postData, downloadFile, uploadFile }, f_loading]
}
