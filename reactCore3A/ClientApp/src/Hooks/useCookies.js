import React, { useState } from 'react'
import Cookies from 'universal-cookie'

// resource
const cksvc = new Cookies()

export default function useCookies()
{
    const [cookies, setCookies] = useState(cksvc.getAll())

    const setCookie = (name, value, options) => {
        // console.log('setCookie', { name, value, options })
        cksvc.set(name, value, options)
        setCookies(cksvc.getAll()) // to refresh
    }

    return [cookies, setCookie]
}
