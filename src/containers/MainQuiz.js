import React, { Component } from 'react'
import styles from './MainQuiz.css';
import ActiveQuestionnaire from '../components/ActiveQuestionnaire/ActiveQuestionnaire'
import FinishedQuestionnaire from '../components/finishedQuestionnaire/FinishedQuestionnaire'
import Loader from '../components/UI/Loader/Loader'
import { connect } from 'react-redux';
import { fetchActiveTest, retryHandler, repeatHandler, answerClick } from '../store/actions/guestScreenActions'



class MainQuiz extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         results: {}, //{[id]: success error}
    //         testId: props.location.pathname.split('/')[2],
    //         isFinished: false,
    //         questionsLoad: false,
    //         activeQuestion: 0,
    //         answerState: null,// {[answerId: 'success' or 'error']}
    //         questionnaireTitle: '',
    //         key: null,
    //         questions: []
    //     }


    // }

    componentDidMount() {
        this.props.fetchActiveTest(this.props.testId)
        // let Title = null
        // let questions = []
        // try {
        //     const response = await axios.get(`https://quiz-316f6.firebaseio.com/quizes/${this.state.testId}.json`)
        //     // console.log('ОТВЕТ ОТ СЕРВЕРА ', response)
        //     response.data.forEach(item => {
        //         Title = item.questionareTitle
        //         questions.push(item)
        //     })

        // } catch (e) {
        //     console.log(e)
        // }


        // this.setState({
        //     questionsLoad: true,
        //     questionnaireTitle: Title,
        //     questions: questions
        // })
    }




    // answerClick = (answerId) => {

    //     if (this.state.answerState) {
    //         const key = Object.keys(this.state.answerState)[0]

    //         if (this.state.answerState[key] === 'success') {
    //             return
    //         }
    //     }

    //     const question = this.state.questions[this.state.activeQuestion]
    //     const results = this.state.results


    //     if (question.rightAnswerId === answerId) {
    //         if (!results[question.id]) {
    //             results[question.id] = 'success'
    //         }

    //         this.setState({
    //             answerState: { [answerId]: 'success' },
    //             results: results
    //         })

    //         const timeout = setTimeout(() => {
    //             if (this.isQuestionnaireFinished()) {
    //                 this.setState({
    //                     isFinished: true
    //                 })
    //             } else {
    //                 this.setState({
    //                     activeQuestion: this.state.activeQuestion + 1,
    //                     answerState: null
    //                 })
    //             }
    //             window.clearTimeout(timeout)
    //         }, 1000)

    //     } else {
    //         results[question.id] = 'error'
    //         this.setState({
    //             answerState: { [answerId]: 'error' },
    //             results: results
    //         })
    //     }


    // }

    // isQuestionnaireFinished() {
    //     return this.state.activeQuestion + 1 === this.state.questions.length ? true : false
    // }

    // retryHandler = () => {

    //     this.setState({
    //         results: {}, //{[id]: success error}
    //         isFinished: false,
    //         activeQuestion: 0,
    //         answerState: null
    //     })
    // }

    // repeatHandler = () => {
    //     this.setState({
    //         guestScreen: true,
    //         questionnaireTitle: null,
    //         questions: []
    //     })
    // }



    render() {

        return (
            <React.Fragment>
                {
                    <div className={styles.MainQuiz}>
                        <div className={styles.MainQuizWrapper}>
                            <h1>"{this.props.questionnaireTitle}"</h1>
                            {
                                !this.props.questionsLoad
                                    ? <Loader />
                                    : this.props.isFinished
                                        ? <FinishedQuestionnaire
                                            results={this.props.results}
                                            questions={this.props.questions}
                                            onRetry={this.props.retryHandler}
                                            onRepeat={this.props.repeatHandler}
                                        />
                                        : <ActiveQuestionnaire
                                            key={this.props.questions[this.props.activeQuestion].id}
                                            answers={this.props.questions[this.props.activeQuestion].answers}
                                            textQuestion={this.props.questions[this.props.activeQuestion].question}
                                            answerClick={this.props.answerClick}
                                            totalNumQuestions={this.props.questions.length}
                                            QuestionNum={this.props.activeQuestion + 1}
                                            answerState={this.props.answerState}
                                        />
                            }

                        </div>
                    </div>
                }
            </React.Fragment>
        )
    }
}
function mapStateToProps(state) {
    console.log('АЙДИ ИЗ АДРЕСНОЙ СТРОКИ', state.allTests.props.location.pathname.split('/'))
    return {
        results: state.allTests.results, //{[id]: success error}
        testId: state.allTests.props.location.pathname.split('/')[2], // ccccccccccccccc
        isFinished: state.allTests.isFinished,
        questionsLoad: state.allTests.questionsLoad,
        activeQuestion: state.allTests.activeQuestion,
        answerState: state.allTests.answerState,// {[answerId: 'success' or 'error']}
        questionnaireTitle: state.allTests.questionnaireTitle,
        key: state.allTests.key,
        questions: state.allTests.questions
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchActiveTest: (testId) => dispatch(fetchActiveTest(testId)),
        retryHandler: () => retryHandler(),
        repeatHandler: () => repeatHandler(),
        answerClick: (answerId) => answerClick(answerId)

    }
}



export default connect(mapStateToProps, mapDispatchToProps)(MainQuiz)