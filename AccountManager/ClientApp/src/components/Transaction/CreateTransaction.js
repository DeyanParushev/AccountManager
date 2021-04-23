import React, { useState, useContext, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create } from '../../services/ApiService';
import BackButton from '../utilities/BackButton';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';
import FilterComponent from '../FilterComponents/FilterComponent';
import { ApiRoutes } from '../api-authorization/ApiAuthorizationConstants';

const CreateTransaction = ({ match, history }) => {
    const context = useContext(UserContext);
    const [category, setCategory] = useState(0);
    const [tag, setTag] = useState(0);
    const [createSucessfull, setCreateSuccessfull] = useState();
    const [errors, setErrors] = useState([]);

    if (!context.user.id) {
        return <Redirect to={ApiRoutes.Login} />
    }

    const onCreateSubmitHandler = (e) => {
        e.preventDefault();
        const transaction = {
            amount: Number(e.target.amount.value),
            categoryId: category,
            description: e.target.description.value,
            accountId: match.params.accountId,
        }

        let entity = ExtractComponentFromRoute(match.path);
        async function postData() {
            const response = await Create('', entity, transaction, context.user.token);
            if (response.status === 200) {
                history.push(`/Accounts/Details/${transaction.accountId}`)
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

    return (
        <Fragment>
            <Form onSubmit={onCreateSubmitHandler}>
                <FormGroup>
                    <Label sm={2} for="amount">Amount</Label>
                    <Col sm={10}>
                        <Input type="number" id="amount" name="amount" step="0.01" placeholder='0.00' />
                    </Col>
                </FormGroup>

                <FilterComponent onChangeFunction={setCategory} componentType='Categories' />

                <FilterComponent onChangeFunction={setTag} componentType='Tags' />

                <FormGroup>
                    <Label sm={2} for="description">Description</Label>
                    <Col sm={10}>
                        <Input type='text-area' id="description" name="description" />
                    </Col>
                </FormGroup>
                {createSucessfull ? <span style={{ color: 'lightgreen' }}><b>Success</b></span> : renderErrors()}
                <Col>
                    <Button outline color="success" >Create</Button>
                </Col>
            </Form>
            <BackButton history={history} />
        </Fragment>
    )
}

export default CreateTransaction;