function ByDate(collection, ascendingOrder) {
    const sortedByDate = [...collection];

    if(ascendingOrder) {
        sortedByDate.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else {
        sortedByDate.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    
    return sortedByDate;
}

function ByAmount(collection, ascendingOrder) {
    const sortedByAmount = [...collection];

    if(ascendingOrder) {
        sortedByAmount.sort((a, b) => Number(a.amount) - Number(b.amount));
    } else {
        sortedByAmount.sort((a, b) => Number(b.amount) - Number(a.amount));
    }
   
    return sortedByAmount;
}

const Sort = {
    ByDate,
    ByAmount,
}

export default Sort;