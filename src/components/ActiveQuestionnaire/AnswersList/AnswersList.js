import React from 'react'
import styles from './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = (props) => {
    return (
        <ul className={styles.AnswersList}>

            {props.answers.map((answer, index) => {

                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        answerClick={props.answerClick}
                        answerState={props.answerState ? props.answerState[answer.id] : null}
                    />
                )
            })}
        </ul>
    )
}

export default AnswersList