import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create } from '../../services/ApiService';
import Error from '../Error/Error';

const CreatAccount = ({history}) => {
    const context = useContext(UserContext);
    const [state, setState] = useState({ message: '' });
    const [showError, setShowError] = useState(false);
    
    const onSubmitHandler = (e) => {
        e.preventDefault();
        
        if (e.target.name.value.length < 3 || e.target.name.value.length > 30) {
           return setState({ message: 'Name should be between 3 and 40 cahracters long.' });
        } else {
           setState({ message: '' })
        }

        const account = {
            name: e.target.name.value,
        };

        Create(context.user.id, 'Accounts', account, context.user.token)
            .then(response => {
                history.push('/Accounts');
            })
            .catch(ex => {
                console.log(ex);
            })
    }

    useEffect(() => {
        if (state.message === '') {
            setShowError(false);
        } else {
            setShowError(true);
        }
    }, [state])

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
                {showError ? <Error message={state.message} /> : null}
                <Button outline color="primary">Create</Button>
            </Form>
        </Fragment>
    )
}

export default CreatAccount;