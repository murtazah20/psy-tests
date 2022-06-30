import React, { Component } from 'react'
import styles from './QuizCreator.css'
import Select from '../../components/UI/Select/Select'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/button/button'
import { createControl, validate, validateForm } from './../../FormFrames/formFrameworks';
import QuestionareTitle from './QuestionareTitle/QuestionareTitle'
import axios from 'axios'

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым или короче 5 символов'
        }, {
            required: true,
            minLength: 5
        }),
        option1: createControl({
            label: 'Вариант 1',
            errorMessage: 'Вариант не должен быть пустым',
            id: 1
        }, { required: true }),
        option2: createControl({
            label: 'Вариант 2',
            errorMessage: 'Вариант не должен быть пустым',
            id: 2
        }, { required: true }),
        option3: createControl({
            label: 'Вариант 3',
            errorMessage: 'Вариант не должен быть пустым',
            id: 3
        }, { required: true }),
        option4: createControl({
            label: 'Вариант 4',
            errorMessage: 'Вариант не должен быть пустым',
            id: 4

        }, { required: true })
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        questionareTitleSelected: false,
        questionareTitle: '',
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()

        const quiz = this.state.quiz.slice()
        const index = quiz.length + 1

        const questionItem = {
            questionareTitle: this.state.questionareTitle,
            question: this.state.formControls.question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {
                    text: this.state.formControls.option1.value,
                    id: this.state.formControls.option1.id
                },
                {
                    text: this.state.formControls.option2.value,
                    id: this.state.formControls.option2.id
                },
                {
                    text: this.state.formControls.option3.value,
                    id: this.state.formControls.option3.id
                },
                {
                    text: this.state.formControls.option4.value,
                    id: this.state.formControls.option4.id
                }
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz: quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })

    }

    createQuizHandler = async event => {
        event.preventDefault()

        try {
            const response = await axios.post('https://quiz-316f6.firebaseio.com/quizes.json', this.state.quiz)

            console.log('УШЕЛ ОПРОС', response)
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls(),
                questionareTitleSelected: false
            })
        } catch (e) {
            console.log(e)
        }


        // axios.post('https://quiz-316f6.firebaseio.com/quizes.json', this.state.quiz)
        // .then(response=>console.log(response))
        // .catch(error=>console.log(error))
    }

    changeHandler = (value, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.touched = true
        control.value = value
        control.valid = validate(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls: formControls,
            isFormValid: validateForm(formControls)
        })
    }




    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlN, index) => {
            const control = this.state.formControls[controlN]

            return (
                <React.Fragment key={controlN + index}>
                    <Input
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.changeHandler(event.target.value, controlN)}
                    />

                    {
                        index === 0 ? <hr></hr> : null
                    }
                </React.Fragment>
            )
        })
    }

    selectChangeHandler = (event) => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }


    questionareTitle = (event) => {
        event.preventDefault()
        if (this.state.questionareTitle.trim().length > 5) {
            this.setState({
                questionareTitleSelected: true
            })
        }

    }

    QuestionareTitleChange = (event) => {
        let inputValue = event.target.value

        this.setState({
            questionareTitle: inputValue
        })
    }

    render() {
        console.log('массив вопросов', this.state.quiz)
        const select = <Select
            label="Выберите правильный ответ"
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 }
            ]}

        />
        return (
            <div className={styles.QuizCreator}>

                {
                    this.state.questionareTitleSelected === false ?
                        <QuestionareTitle
                            QuestionareTitle={this.questionareTitle}
                            QuestionareTitleChange={this.QuestionareTitleChange}
                            errorMessage={
                                this.state.questionareTitle.trim().length > 5
                                    ? null
                                    : 'Заголовок не должен быть пустым или короче 5 сиволов'}
                        />
                        : <div>
                            <h1>Создание теста</h1>

                            <form onSubmit={this.submitHandler}>

                                {this.renderInputs()}

                                {select}

                                <Button
                                    type="primary"
                                    onClick={this.addQuestionHandler}
                                    disabled={!this.state.isFormValid}
                                >
                                    Добавить вопрос
                            </Button>

                                <Button
                                    type="success"
                                    onClick={this.createQuizHandler}
                                    disabled={this.state.quiz.length === 0}
                                >
                                    Создать тест
                            </Button>

                            </form>
                        </div>
                }
            </div>
        )
    }

}