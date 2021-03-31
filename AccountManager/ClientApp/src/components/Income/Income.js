import React from 'react';
import { useState, useEffect } from 'react';
import {GetAll} from '../../services/IncomesService';
import { Transaction } from '../Transaction/Transaction';

function Income(props) {
    const [incomes, setIncomes] = useState([]);
    
    useEffect(() => {
       GetAll("dadawdaws")
       .then(res => console.log(res));
    }, []);

    return (
        <p>Something</p>
    )
}

export default Income;
