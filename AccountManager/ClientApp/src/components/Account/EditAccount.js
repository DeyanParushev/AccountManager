import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { GetOne } from '../../services/ApiService';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';
import BackButton from '../utilities/BackButton';

function EditAccount({ match, history }) {
    const [account, setAccount] = useState({});
    const conetext = useContext(UserContext);
    const [editSuccessfull, setEditSuccessfull] = useState();
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        if (!conetext.user.id) {
            history.push(ApplicationRoutes.Login);
        }

        async function getAccount() {
            const response = await GetOne(conetext.user.id, 'Accounts', conetext.user.token);

            if (response.status === 200) {
                const responseAcccount = response.json();
                setAccount(responseAcccount);
            } else {
                setEditSuccessfull(false);
                const responseError = await response.json();
                setErrors(responseError.errors);
            }
        }

        if (!account.hasOwnProperty('id')) {
            getAccount();
        }
    });

    function renderErrors() {
        console.log(errors);
        if (errors.length > 0) {
            return errors.map(x => <div key={x}><span><b style={{ color: 'red' }}>{errors[x]}</b></span></div>)
        }
        return null;
    }

    function onSubmitHandler(event) {
        event.preventDefault();

        console.log('Edit');
    }

    return (
        <Fragment>
            <Form onSubmit={onSubmitHandler}>
                <FormGroup>
                    <Label sm={2} for="name">Account Name</Label>
                    <Col sm={10}>
                        <Input type='text' id="name" name="name" required defaultValue={account.name} />
                    </Col>
                </FormGroup>
                {editSuccessfull ? <span style={{ color: 'lightgreen' }}><b>Success</b></span> : renderErrors()}

                <Col>
                    <Button outline color="success" >Edit</Button>
                </Col>
            </Form>
            <BackButton history={history} />
        </Fragment>
    )
}

export default EditAccount;