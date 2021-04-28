function ByCategory(collection, category) {
    if(Number(category) === 0) {
        return collection;
    }

    const filteredCollection = collection.filter(item => Number(item.category.id) === Number(category));
    return filteredCollection;
}

const Filter = {
    ByCategory,
}

export default Filter;