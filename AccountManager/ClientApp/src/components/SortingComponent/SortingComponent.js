import React, { useState } from 'react';
import Sort from '../../utilityFunctions/SortingFunctions';

function SortingComponent({ property, collection, setCollection }) {
    const [ascending, setAscending] = useState(true);

    const sorter = {
        amount: 'ByAmount',
        date: 'ByDate',
    }

    function onClickSortHandler(event) {
        const sortedCollection = Sort[sorter[property]](collection, ascending);
        setAscending(() => !ascending);
        setCollection(sortedCollection);
    }

    return <span onClick={onClickSortHandler}><i className="fas fa-sort"></i></span>
}

export default SortingComponent;