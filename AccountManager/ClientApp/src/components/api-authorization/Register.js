import Button from '../Button';
import React, { Component } from 'react';
import InputField from '../InputField';
import { RegisterService } from './AuthServices';

export default class Register extends Component {
    onSubmitHandler = async (event) => {
        event.preventDefault();
        var user = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        }

        var response = await RegisterService(user);
        console.log(response);
    }

    render() {
        return (
            <div>
                <form>
                    <h1>Register</h1>
                    <InputField type={'text'} name={'username'} displayName={'Username'} />
                    <InputField type={'email'} name={'email'} displayName={'Email'} />
                    <InputField type={'password'} name={'password'} displayName={'Password'} />
                    <InputField type={'password'} name={'confirmPassword'} displayName={'Confirm Password'} />
                    <Button type={'submit'} onClickHandler={this.onSubmitHandler} displayName={'Register'} />
                </form>
            </div>
        )
    }
}
