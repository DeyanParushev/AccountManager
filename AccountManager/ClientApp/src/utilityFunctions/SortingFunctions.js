function ByDate(collection) {
    const sortedByDate = [...collection];
    sortedByDate.sort((a, b) => new Date(a.date) - new Date(b.date))
    return sortedByDate;
}   

const Sort = {
    ByDate,
}

export default Sort;