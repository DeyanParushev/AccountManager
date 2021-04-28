import React, { useState, useEffect } from 'react';
import { Label, Col, FormGroup } from 'reactstrap';
import Filter from '../../utilityFunctions/FilterFunctions';
import FilterComponent from './FilterComponent';

function CategoryFilter({ transactions, filterTransactions }) {
    const [category, setCategory] = useState(Number(0));

    useEffect(() => {
        const filterredTransactions = Filter.ByCategory(transactions, category);
        filterTransactions(filterredTransactions);
    }, [category, transactions, filterTransactions])

    return (
        <FormGroup>
            <Label sm={2}>Filter by category</Label>
            <Col sm={8}>
                <FilterComponent componentType='Categories' onChangeFunction={setCategory} />
            </Col>
        </FormGroup>
    )
}

export default CategoryFilter;