import React, { useState, useEffect } from 'react'
import axios from 'axios'

/// 設定用於載入基本資料檔，如：code-name map, codeList
export default function useLoad(url, args) {
    const [f_loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'POST',
            url: url,
            data: args
        }).then(resp => {
            setData(resp.data)
            setError(null)
        }).catch(xhr => {
            console.error('useLoad:ERROR', xhr.response.data)
            setError(xhr.response.data)
        }).finally(() => {
            setLoading(false)
        })
    }, [args])

    return [data, f_loading, error]
}