import React from 'react'
import styles from './QuestionareTitle.css'
import Button from '../../../components/UI/button/button'

const QuestionareTitle = (props) => {
    return (
        <form className={styles.QuestionareTitle}>
            <label htmlFor="QuestionareTitle">Ведите название Вашего опроса</label>
            <input id='QuestionareTitle'
                onChange={props.QuestionareTitleChange}
            ></input>
            <span>{props.errorMessage}</span>
            <Button
                type="primary"
                onClick={props.QuestionareTitle}
            >
                Подтвердить название
            </Button>

        </form>
    )
}

export default QuestionareTitle