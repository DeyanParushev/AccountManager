import React from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Alert } from 'reactstrap';
import { RegisterService } from '../../services/AuthServices';

const Register = ({
    history,
}) => {

    const [isRegistered, setState] = React.useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const user = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        }
        var result = await RegisterService(user);

        if (result === "Created") {
            setTimeout(setState({isRegistered: true}), 2000);
            history.push('/Identity/Login');
        }
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
                <Col>
                    <Button outline color="primary" >Register</Button>
                </Col>
            </Form>
        </div>
    )
}

export default Register;
