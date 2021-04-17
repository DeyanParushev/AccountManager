import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { LoginService } from '../../services/AuthServices';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import GetUser from '../../services/CookieProccessor';

const Login = ({ props }) => {
    const context = useContext(UserContext);
    const [createSucessfull, setCreateSuccessfull] = useState();
    const [error, setError] = useState('');


    if (context.user.id !== "") {
        return <Redirect to={props.location || '/'} />
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const sendUser = {
            email: event.target.email.value,
            password: event.target.password.value,
        };

        const result = await LoginService(sendUser);
        if (result.status === 200) {
            props.history.push('/');
        } else {
            setCreateSuccessfull(false);
            const responseError = await result.json();
            setError(responseError);
        }
    }

    function renderErrors() {
        if (error) {
            return <div><span><b style={{ color: 'red' }}>{error}</b></span></div>
        }
        return null;
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
                {createSucessfull ? <span style={{ color: 'lightgreen' }}><b>Success</b></span> : renderErrors()}
                <Col>
                    <Button outline color="primary" >Login</Button>
                </Col>
            </Form>
        </React.Fragment>
    )
}

export default Login;
