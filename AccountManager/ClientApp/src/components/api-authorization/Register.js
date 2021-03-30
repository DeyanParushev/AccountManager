import * as React from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Alert } from 'reactstrap';
import { RegisterService } from '../../services/AuthServices';

export default class Register extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isRegistered: false,
        }
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(this.state.isRegistered);
        const user = {
            username: event.target.username.value,
            email: event.target.email.value,
            password: event.target.password.value,
            confirmPassword: event.target.confirmPassword.value,
        }
        const response = await RegisterService(user);

        if (response.status === 400) {
            this.setState({ isRegistered: true });
            console.log(this.state.isRegistered);
        }
    }

    render() {
        return (
            <div>
                {this.state.isRegistered && <h1>You`ve been successfuly registered!</h1>}
                <Form onSubmit={this.onSubmitHandler}>
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
}
