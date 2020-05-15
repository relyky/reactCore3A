import React, { useState, useLayoutEffect } from 'react'
import Cookies from 'universal-cookie'

const cksvc = new Cookies()

export default function useCookies()
{
    const [cookies, setCookies] = useState({})
    const rawcookies = cksvc.getAll()

    useLayoutEffect(() => {
        setCookies(rawcookies)
    }, [...Object.values(rawcookies)])

    return [cookies]
}