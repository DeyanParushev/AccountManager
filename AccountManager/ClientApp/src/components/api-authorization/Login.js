import React, { Component, Fragment } from 'react';
import { LoginService } from './AuthServices';
import InputField from '../InputField';
import Button from '../Button';

export default class Login extends Component {

    onSubmitHandler = async (event) => {
        event.preventDefault();
        var user = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        var result = await LoginService(user);
        console.log(result);
    }

    render() {
        return (
            <Fragment>
                <h1>Login</h1>

                <form onSubmit={this.onSubmitHandler}>
                    <InputField name='email' type='text' displayName='Email' />
                    <InputField name='password' type='password' displayName='Password' />
                    <Button type='submit' onClickHandler={this.onSubmitHandler} displayName='Login' />
                </form>
            </Fragment>
        )
    }
}
