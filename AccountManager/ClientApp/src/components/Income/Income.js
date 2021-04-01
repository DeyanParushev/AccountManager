import React from 'react';
import { useState, useEffect } from 'react';
import {GetAll, GetOne, Delete, Create, Edit} from '../../services/ApiService';
import { Transaction } from '../Transaction/Transaction';

function Income(props) {
    const [incomes, setIncomes] = useState([]);
    
    useEffect(() => {
       GetAll("dadawdaws", "Expenses")
       .then(res => console.log(res));
    }, []);

    return (
        <p>Something</p>
    )
}

export default Income;
