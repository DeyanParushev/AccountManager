import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Form, FormGroup, Label, Input, Button, Col} from 'reactstrap';
import UserContext from '../../contexts/UserContext';
import {GetOne, Edit} from '../../services/ApiService';
import {ExtractComponentFromRoute} from '../../utilityFunctions/RoutingFunctions';
import FilterComponent from '../FilterComponents/FilterComponent';
import BackButton from '../utilities/BackButton';

function EditTransaction({match, history}) {
    const context = useContext(UserContext);
    const [transaction, setTransaction] = useState({});
    const transactionType = ExtractComponentFromRoute(match.path);
    const [category, setCategory] = useState(0);
    const [tag, setTag] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await GetOne(match.params.id, transactionType, context.user.token);

            if(transaction.hasOwnProperty('id') === false) {
                const transactionResult = await response.json();
                await setTransaction(transactionResult);
            } else if (response.status === 400 || response.status === 401) {
                console.log(response);
            } else {
                console.log('OtherError');
            }
        }

        fetchData();
    }, [transaction]);
    
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
        if(response.status === 200) {
            history.push(`/Accounts/Details/${transaction.accountId}`);
        } else {
            const error = await response.json();
            console.log(error);
        }
    }

    return (
        <Fragment>
            <Form onSubmit={onEditSubmitHandler}>
                <FormGroup>
                    <Label sm={2} for="amount">Amount</Label>
                    <Col sm={10}>
                        <Input type="number" id="amount" name="amount" step="0.01" required defaultValue={transaction.amount}/>
                    </Col>
                </FormGroup>

                <FilterComponent onChangeFunction={setCategory} componentType='Categories'/>

                <FilterComponent onChangeFunction={setTag} componentType='Tags' /> 
              
                <FormGroup>
                    <Label sm={2} for="description">Description</Label>
                    <Col sm={10}>
                        <Input type='text-area' id="description" name="description" required defaultValue={transaction.description}/>
                    </Col>
                </FormGroup>
                <Col>
                    <Button outline color="success" >Edit</Button>
                </Col>
            </Form>
            <BackButton history={history} />
        </Fragment>
    )
}

export default EditTransaction;
