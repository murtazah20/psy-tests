import React from 'react'
import styles from './button.css'

const Button = (props) => {
    const cls = [
        styles.button,
        styles[props.type],
        
    ]

    return (
        <button 
        className={cls.join(' ')}
        onClick={props.onClick}>
            {props.children}
        </button>
   )
}

export default Button