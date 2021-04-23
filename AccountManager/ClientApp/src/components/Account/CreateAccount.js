import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create } from '../../services/ApiService';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';
import BackButton from '../utilities/BackButton';

const CreatAccount = ({ history }) => {
    const context = useContext(UserContext);
    const [createSucessfull, setCreateSuccessfull] = useState();
    const [errors, setErrors] = useState([]);

    const onSubmitHandler = (e) => {
        e.preventDefault();

        const account = {
            name: e.target.name.value,
        };

        async function postData() {
            const response = await Create(context.user.id, 'Accounts', account, context.user.token);
            if (response.status === 200) {
                history.push(ApplicationRoutes.Accounts.All)
            } else {
                setCreateSuccessfull(false);
                const responseError = await response.json();
                setErrors(responseError.errors);
            }
        }

        postData();
    }

    function renderErrors() {
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map(x => <div key={x}><span><b style={{ color: 'red' }}>{errors[x]}</b></span></div>)
        }
        return null;
    }

    useEffect(() => {
        if (!context.user.id) {
            history.push(ApplicationRoutes.Login);
        }
    })

    return (
        <Fragment>
            <h1>Create account</h1>
            <Form onSubmit={onSubmitHandler}>
                <FormGroup>
                    <Label sm={2} for="name">Account name</Label>
                    <Col sm={10}>
                        <Input type="text" id="name" name="name" />
                    </Col>
                </FormGroup>
                {createSucessfull ? <span style={{ color: 'lightgreen' }}><b>Success</b></span> : renderErrors()}
                <Button outline color="success">Create</Button>
            </Form>
            <BackButton history={history} />
        </Fragment>
    )
}

export default CreatAccount;