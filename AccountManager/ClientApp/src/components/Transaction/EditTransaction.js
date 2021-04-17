import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import { GetOne, Edit } from '../../services/ApiService';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';
import FilterComponent from '../FilterComponents/FilterComponent';
import BackButton from '../utilities/BackButton';

function EditTransaction({ match, history }) {
    const context = useContext(UserContext);
    const [transaction, setTransaction] = useState({});
    const transactionType = ExtractComponentFromRoute(match.path);
    const [category, setCategory] = useState(0);
    const [tag, setTag] = useState(0);
    const [editSuccessfull, setCreateSuccessfull] = useState();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!context.user.id) {
            history.push('/Identity/Login');
        }

        async function fetchData() {
            const response = await GetOne(match.params.id, transactionType, context.user.token);

            if (response.status === 200) {
                const transactionResult = await response.json();
                await setTransaction(transactionResult);
            } else {
                setCreateSuccessfull(false);
                const responseError = await response.json();
                setErrors(responseError.errors);
            }
        }

        if(!transaction.hasOwnProperty('id')){
            fetchData();
        }

    }, [transaction]);

    function renderErrors() {
        if (Object.keys(errors).length > 0) {
            return Object.keys(errors).map(x => <div key={x}><span><b style={{ color: 'red' }}>{errors[x]}</b></span></div>)
        }
        return null;
    }

    async function onEditSubmitHandler(e) {
        e.preventDefault();
        const editTransaction = {
            id: transaction.id,
            accountId: transaction.accountId,
            amount: e.target.amount.value,
            categoryId: category,
            tags: tag,
            description: e.target.description.value,
        }

        const response = await Edit(editTransaction.id, transactionType, editTransaction, context.user.token);
        if (response.status === 200) {
            history.push(`/Accounts/Details/${transaction.accountId}`);
        } else {
            setCreateSuccessfull(false);
            const responseError = await response.json();
            setErrors(responseError.errors);
        }
    }

    return (
        <Fragment>
            <Form onSubmit={onEditSubmitHandler}>
                <FormGroup>
                    <Label sm={2} for="amount">Amount</Label>
                    <Col sm={10}>
                        <Input type="number" id="amount" name="amount" step="0.01" required defaultValue={transaction.amount} />
                    </Col>
                </FormGroup>

                <FilterComponent onChangeFunction={setCategory} componentType='Categories' />

                <FilterComponent onChangeFunction={setTag} componentType='Tags' />

                <FormGroup>
                    <Label sm={2} for="description">Description</Label>
                    <Col sm={10}>
                        <Input type='text-area' id="description" name="description" required defaultValue={transaction.description} />
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

export default EditTransaction;
