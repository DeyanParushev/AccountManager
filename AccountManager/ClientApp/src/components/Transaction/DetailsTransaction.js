import React, { useState, useEffect, useContext, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import { GetOne } from '../../services/ApiService';
import { Table } from 'reactstrap';
import BackButton from '../utilities/BackButton';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';

const DetailsTransaction = ({ match, history }) => {

    const context = useContext(UserContext);
    const [transaction, setTransaction] = useState({});
    const [date, setDate] = useState('');
    const transactionType = ExtractComponentFromRoute(match.path);
    const transactionId = match.params.id;

    useEffect(() => {
        let transactionResponse = {};
        async function fetchData() {
            const result = await GetOne(transactionId, transactionType, context.user.token);

            if (transaction.hasOwnProperty('id') === false) {
                transactionResponse = await result.json();
                await setTransaction(transactionResponse);
            } else if (result.status === 400 || result.status === 401) {
                console.log(result);
            } else {
                console.log('OtherError');
            }
        }

        fetchData();

        const date = new Date(transaction.date);
        const shortDateString = date.toLocaleDateString();
        setDate(shortDateString);
        // Creates two requests!!
    }, [transaction]);

    function transactionColor() {
        if (transactionType === 'Expenses') {
            return 'red';
        } else {
            return 'green';
        }
    }

    return (
        <Fragment>
            <h1>Details</h1>
            <Table>
                <tbody>
                    <tr>
                        <td><b>Date</b></td>
                        <td>{date}</td>
                    </tr>
                    <tr>
                        <td><b>Category</b></td>
                        <td>{transaction.category ? transaction.category.name : ''}</td>
                    </tr>
                    <tr>
                        <td><b>Amount</b></td>
                        <td style={{ color: transactionColor() }}>{transaction.amount}</td>
                    </tr>
                    <tr>
                        <td><b>Description</b></td>
                        <td>{transaction.description}</td>
                    </tr>
                </tbody>
            </Table>
            <BackButton history={history} />
        </Fragment>
    )
}

export default DetailsTransaction;