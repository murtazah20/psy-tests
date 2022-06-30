import React from 'react'
import styles from './AnswerItem.css'


const AnswerItem = (props) => {
    const cls = [styles.AnswerItem]

    if(props.answerState){
        cls.push(styles[props.answerState])
    }
    
    return(
        <li className={cls.join(' ')}
        onClick={()=> props.answerClick(props.answer.id)}
        >
            {props.answer.text}
        </li>
    )
}

export default AnswerItem