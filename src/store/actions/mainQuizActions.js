import axios from 'axios'
import {FETCH_ACTIVE_QUESTIONARE_TITLE_AND_QUESTIONS, FETCH_QUESTIONARE_TITLES_ERROR, RETRY_HANDLER, REPEAT_HANDLER, ANSWER, IS_QUESTIONNAIRE_FINISHED, NEXT_QUESTION} from './actionTypes'

export function fetchActiveTest(){
    return async dispatch => {
        let Title = null
        let questions = []
        try {
            const response = await axios.get(`https://quiz-316f6.firebaseio.com/quizes/${testId}.json`)
            console.log('ОТВЕТ ОТ СЕРВЕРА ', response)
            response.data.forEach(item => {
                Title = item.questionareTitle
                questions.push(item)
            })

            dispatch(fetchActiveTestTitleQuestions(Title,questions))
        } catch (e) {
            dispatch(fetchActiveTestTitleQuestionsError(e))
        }
    }
}

export function answerClick(answerId){
    
    if (answerState) {
        const key = Object.keys(answerState)[0]
        if (answerState[key] === 'success') {
            return
        }
    }

    const question = questions[activeQuestion]
    const results = results


    if (question.rightAnswerId === answerId) {
        if (!results[question.id]) {
            results[question.id] = 'success'
        }

        dispatch(Answer({ [answerId]: 'success' }, results))

        const timeout = setTimeout(() => {
            if (isQuestionnaireFinished()) {
                dispatch (QuestionnaireFinished())
            } else {
                dispatch (nextQuestion())
            }
            window.clearTimeout(timeout)
        }, 1000)

    } else {
        results[question.id] = 'error'
        dispatch(Answer({ [answerId]: 'error' }, results))
    }
}

export function Answer(answerState, results){
    return {
        type: ANSWER,
        answerState: answerState,
        results: results
    }
}


export function isQuestionnaireFinished(){
    return activeQuestion + 1 === questions.length ? true : false
}

export function QuestionnaireFinished(){
    return {
        type: IS_QUESTIONNAIRE_FINISHED,
        isFinished: true
    }
}

export function nextQuestion(){
    return {
        type: NEXT_QUESTION,
    }
}


export function fetchActiveTestTitleQuestions(title,questions) {
    return {
        type: FETCH_ACTIVE_QUESTIONARE_TITLE_AND_QUESTIONS,
        questionnaireTitle: title,
        questions: questions
    }
}

export function fetchActiveTestTitleQuestionsError(e) {
    return {
        type: FETCH_QUESTIONARE_TITLES_ERROR,
        error: e
    }
}

export function retryHandler () {
    return {
        type: RETRY_HANDLER
    }
}

export function repeatHandler(){
    return {
        type: REPEAT_HANDLER
    }
}