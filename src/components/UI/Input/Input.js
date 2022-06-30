import React from 'react'
import styles from './Input.css'

function isInvalid({valid, touched, shouldValidate}) {
    if(!valid && shouldValidate && touched) { // контрол не валидный, подлежит валидации, в него уже что то вводили
        return true // не прошел валидацию
    }

    return false

}

const Input = (props) => {
    const inputType = props.type || 'text'
    const cls = [styles.Input]
    const htmlFor = `${inputType} - ${Math.random()}`

    if(isInvalid(props)){
        cls.push(styles.invalid)

    }

return (
    <div className={cls.join(' ')}>
        <label htmlFor={htmlFor}>{props.label}</label>
        <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        />

        {isInvalid(props)
            ? <span>{props.errorMessage || 'Введите верное значение'}</span>
            : null
        }

        
    </div>

)
}

export default Input