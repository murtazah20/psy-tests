import axios from 'axios'
import { FETCH_QUESTIONARE_TITLES, FETCH_QUESTIONARE_TITLES_ERROR, FETCH_TEST_ID,
    FETCH_ACTIVE_QUESTIONARE_TITLE_AND_QUESTIONS,
    RETRY_HANDLER, ANSWER, 
    IS_QUESTIONNAIRE_FINISHED, 
    NEXT_QUESTION,
    REPEAT_HANDLER } from './actionTypes'

export function fetchAllTestsTitles() {
    return async dispatch => {
        try {
            const response = await axios.get('https://quiz-316f6.firebaseio.com/quizes.json')

            const allQuestionnaireTitles = []

            Object.keys(response.data).forEach(key => {
                let t = [key, response.data[key][0].questionareTitle]
                allQuestionnaireTitles.push(t)

            })

            dispatch(fetchAllQuestionnaireTitles(allQuestionnaireTitles))

        } catch (e) {
            dispatch(fetchAllQuestionnaireTitlesError(e))
        }
    }

}

export function testID(testId) {
    return {
        type: FETCH_TEST_ID,
        testId: testId
    }
}

export function fetchAllQuestionnaireTitles(allQuestionnaireTitles) {
    return {
        type: FETCH_QUESTIONARE_TITLES,
        allQuestionnaireTitles
    }
}

export function fetchAllQuestionnaireTitlesError(e) {
    return {
        type: FETCH_QUESTIONARE_TITLES_ERROR,
        error: e
    }
}

export function fetchActiveTest(testId){
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
    return async dispatch => {
        if (this.answerState) {
            const key = Object.keys(this.answerState)[0]
            if (this.answerState[key] === 'success') {
                return
            }
        }

        const question = this.questions[this.activeQuestion]
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
}

export function Answer(answerState, results){
    return {
        type: ANSWER,
        answerState: answerState,
        results: results
    }
}


export function isQuestionnaireFinished(){
    return this.activeQuestion + 1 === this.questions.length ? true : false
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
