import React, { Component } from 'react'
import styles from './Auth.css'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/button/button'
import axios from 'axios'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Сдается мне ты пытаешься скользонуть?',
                valid: false,
                touched: false,
                validations: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Пароль гниловат',
                valid: false,
                touched: false,
                validations: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    submitHandler = (event) => {
        event.preventDefault()
    }


    loginHandler = async (event) => {
        if (!this.state.isFormValid) {
            event.preventDefault()
            console.log('Не прошли валидацию')
        }
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyALD2dHT9lF2G6-J7nv3BtJkrMcUhk8HgI', authData)

            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }



    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try {
            const response = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyALD2dHT9lF2G6-J7nv3BtJkrMcUhk8HgI', authData)

            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    renderInput() {
        return Object.keys(this.state.formControls).map((formControl, index) => {
            const control = this.state.formControls[formControl]

            return (
                <Input
                    key={index}
                    type={control.type}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    valid={control.valid}
                    touched={control.touched}
                    shouldValidate={true}
                    onChange={event => this.onChangeHandler(event, formControl)}
                />

            )
        })
    }

    validateControl(value, validations) {
        if (!validations) {
            return true
        }

        let isValid = true

        if (validations.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validations.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validations.minLength) {
            isValid = value.length >= validations.minLength && isValid
        }



        return isValid

    }

    onChangeHandler = (event, formControl) => {

        const formControls = { ...this.state.formControls }
        const control = { ...formControls[formControl] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validations)

        formControls[formControl] = control

        let isFormValid = true
        console.log('Волид до?', isFormValid)
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid

        })
        console.log('Волид после?', isFormValid)
        this.setState({
            formControls,
            isFormValid
        })
    }


    render() {

        return (
            <div className={styles.Auth}>
                <div>
                    <h1>Аутентификация</h1>

                    <form onSubmit={this.submitHandler} className={styles.AuthForm}>
                        {this.renderInput()}

                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}

                        >
                            Войти
                        </Button>
                        {console.log('Волид стейта', this.state.isFormValid)}
                        <Button
                            type="primary"
                            onClick={this.registerHandler}
                            disabled={this.state.isFormValid}
                        >
                            Зарегистрироваться
                        </Button>
                    </form>

                </div>

            </div>
        )

    }


}

