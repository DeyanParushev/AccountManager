import React, { useState, useContext, Fragment } from 'react'
import { Redirect } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { Create } from '../../services/ApiService';
import BackButton from '../utilities/BackButton';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';
import FilterComponent from '../FilterComponents/FilterComponent';

const CreateTransaction = ({ match, history }) => {
    const context = useContext(UserContext);
    const [category, setCategory] = useState(0);
    const [tag, setTag] = useState(0);

    if (!context.user.id) {
        return <Redirect to='/Identity/Login' />
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
                const jsonResponse = await response.json();
                console.log(jsonResponse);
            }
        }

        postData();
    }

    return (
        <Fragment>
            <Form onSubmit={onCreateSubmitHandler}>
                <FormGroup>
                    <Label sm={2} for="amount">Amount</Label>
                    <Col sm={10}>
                        <Input type="number" id="amount" name="amount" step="0.01" placeholder='0.00'/>
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
                <Col>
                    <Button outline color="success" >Create</Button>
                </Col>
            </Form>
            <BackButton history={history} />
        </Fragment>
    )
}

export default CreateTransaction;