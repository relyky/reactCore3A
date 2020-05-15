import React from 'react'

export function InputText(props) {
    return (
        <input {...props}
            value={props.value || ''}
            onChange={e => props.onChange && props.onChange(e.target.name, e.target.value)}
        />
    )
}