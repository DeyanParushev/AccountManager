import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import { RegisterService } from '../../services/AuthServices';
import ApplicationRoutes from './ApplicationRoutes';

const Register = ({
    history,
}) => {

    const [isRegistered, setState] = useState(false);
    const [createSucessfull, setCreateSuccessfull] = useState();
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const user = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        }
        const result = await RegisterService(user);

        if (result.status === 200) {
            setTimeout(setState({ isRegistered: true }), 2000);
            history.push(ApplicationRoutes.Login);
        } else {    
            setCreateSuccessfull(false);
            const responseError = await result.json();
            setErrors(responseError.errors);
        }
    }

    function renderErrors() {
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map(x => <div key={x}><span><b style={{ color: 'red' }}>{errors[x]}</b></span></div>)
        }
        return null;
    }

    return (
        <div>
            {isRegistered && <h1>You`ve been successfuly registered!</h1>}
            <Form onSubmit={onSubmitHandler}>
                <FormGroup>
                    <Label sm={2} for="username">Username</Label>
                    <Col sm={10}>
                        <Input type="text" id="username" name="username" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Label sm={2} for="email">Email</Label>
                    <Col sm={10}>
                        <Input type="email" id="email" name="email" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Label sm={2} for="password">Password</Label>
                    <Col sm={10}>
                        <Input type="password" id="password" name="password" />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Label sm={2} for="confirmPassword">Password</Label>
                    <Col sm={10}>
                        <Input type="password" id="confirmPassword" name="confirmPassword" />
                    </Col>
                </FormGroup>
                {createSucessfull ? <span style={{ color: 'lightgreen' }}><b>Success</b></span> : renderErrors()}
                <Col>
                    <Button outline color="primary" >Register</Button>
                </Col>
            </Form>
        </div>
    )
}

export default Register;
