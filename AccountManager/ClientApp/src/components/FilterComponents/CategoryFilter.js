import React, { useState, useEffect, Fragment } from 'react';
import { Label, Col } from 'reactstrap';
import Filter from '../../utilityFunctions/FilterFunctions';
import FilterComponent from './FilterComponent';

function CategoryFilter({ transactions, filterTransactions }) {
    const [category, setCategory] = useState(Number(0));

    useEffect(() => {
        const filterredTransactions = Filter.ByCategory(transactions, category);
        filterTransactions(filterredTransactions);
    }, [category, transactions, filterTransactions])

    return (
        <Fragment>
            <Label xs='3'>Filter by category</Label>
            <Col sm={8}>
                <FilterComponent componentType='Categories' onChangeFunction={setCategory} />
            </Col>
        </Fragment>
    )
}

export default CategoryFilter;