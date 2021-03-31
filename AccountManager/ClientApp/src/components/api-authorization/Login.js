import * as React from 'react';
import { LoginService } from '../../services/AuthServices';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
        }
    }

    onSubmitHandler = async (event) => {
        event.preventDefault();
        var user = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        var result = await LoginService(user);
        if (result !== 400) {
            this.setState({ isLoggedIn: true });
        }
        else {
            this.setState({ isLoggedIn: false });
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isLoggedIn || <h1>User not logged in</h1>}
                <Form onSubmit={this.onSubmitHandler}>

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
                    <Col>
                        <Button outline color="primary" >Login</Button>
                    </Col>
                </Form>
            </React.Fragment>
        )
    }
}
