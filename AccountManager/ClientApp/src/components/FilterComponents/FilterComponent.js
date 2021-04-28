import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { GetAll } from '../../services/ApiService';

function FilterComponent({ onChangeFunction, componentType }) {
    const context = useContext(UserContext);
    const [components, setComponents] = useState([]);

    useEffect(() => {
        let componentResponse = [];
        async function fetchData(componentType, token) {
            let response = await GetAll('', componentType, token);

            componentResponse = await response.json();
            setComponents(componentResponse);
        }

        if (components.length < 1) {
            fetchData(componentType, context.user.token);
        }

    });

    function renderComponents(components) {
        if (components.length > 0) {
            return components.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
        }
    }

    return (
        <select type='number' onChange={(ev) => { onChangeFunction(ev.target.value) }}>
            <option value={0}>Select...</option>
            {renderComponents(components)}
        </select>
    )
}

export default FilterComponent;