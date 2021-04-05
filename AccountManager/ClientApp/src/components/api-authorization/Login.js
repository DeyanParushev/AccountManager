import * as React from 'react';
import { LoginService } from '../../services/AuthServices';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import GetUser from '../../services/CookieProccessor';

const Login = () => {

    const { setUser } = React.useContext(UserContext);
    const onSubmitHandler = (event) => {
        event.preventDefault();
        const sendUser = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        LoginService(sendUser)
            .then(result => {
                if (result !== 400) {
                    const user = GetUser(document.cookie);
                    console.log(user);
                    console.log(setUser);
                }
                else {
                    console.log(result);
                }
            })
            .catch(ex => {

            })
    }

    return (
        <React.Fragment>

            <Form onSubmit={onSubmitHandler}>
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

export default Login;
