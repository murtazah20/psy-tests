import React from 'react'
import classes from './ActiveQuestionnaire.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuestionnaire = (props) => {
    return (
        <div className={classes.ActiveQuestionnaire}>  
         
            <p className={classes.Question}>
                <span>
                    <strong>{props.QuestionNum}.</strong> &nbsp;
                    {props.textQuestion}
                </span>

                <small className={classes.small}>{props.QuestionNum} из {props.totalNumQuestions}</small>
            </p>

            <AnswersList 
                answers={props.answers}
                answerClick={props.answerClick}
                answerState={props.answerState}
            />
        </div>
    )
}

export default ActiveQuestionnaire