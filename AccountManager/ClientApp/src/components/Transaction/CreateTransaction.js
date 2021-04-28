import React, { useState, useContext, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create } from '../../services/ApiService';
import BackButton from '../utilities/BackButton';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';
import FilterComponent from '../FilterComponents/FilterComponent';
import { ApiRoutes } from '../api-authorization/ApiAuthorizationConstants';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';

const CreateTransaction = ({ match, history }) => {
    const context = useContext(UserContext);
    const [category, setCategory] = useState(0);
    const [, setTag] = useState(0);
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
            accountId: match.params.id,
        }

        let entity = ExtractComponentFromRoute(match.path);
        async function postData() {
            const response = await Create('', entity, transaction, context.user.token);
            if (response.status === 200) {
                history.push(ApplicationRoutes.Accounts.Details(match.params.id));
            } else {
                setCreateSuccessfull(false);
                const responseError = await response.json();
                setErrors(responseError.errors);
            }
        }

        postData();
    }

    function renderErrors(errorList) {
        if (errorList !== undefined && errorList.length > 0) {
            return errorList.map(x => <div key={x}><span><b style={{ color: 'red' }}>{errorList[x]}</b></span></div>)
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

                <FormGroup>
                    <Label sm={2}>Category</Label>
                    <FilterComponent onChangeFunction={setCategory} componentType='Categories' />
                </FormGroup>

                <FormGroup>
                    <Label sm={2}>Tag</Label>
                    <FilterComponent onChangeFunction={setTag} componentType='Tags' />
                </FormGroup>

                <FormGroup>
                    <Label sm={2} for="description">Description</Label>
                    <Col sm={10}>
                        <Input type='text-area' id="description" name="description" />
                    </Col>
                </FormGroup>
                {createSucessfull ? <span style={{ color: 'lightgreen' }}><b>Success</b></span> : renderErrors(errors)}
                <Col>
                    <Button outline color="success" >Create</Button>
                </Col>
            </Form>
            <BackButton history={history} />
        </Fragment>
    )
}

export default CreateTransaction;