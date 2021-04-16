import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { GetAll } from '../../services/ApiService';
import { FormGroup, Label } from 'reactstrap';

function FilterComponent({ onChangeFunction, componentType }) {
    const context = useContext(UserContext);
    const [components, setComponents] = useState([]);
   
    useEffect(() => {
        let componentResponse = [];
        async function fetchData() {
            let response = await GetAll('', componentType, context.user.token);

            componentResponse = await response.json();
            setComponents(componentResponse);
        }

        if (components.length < 1) {
            fetchData();
        }

    }, [components]);

    function renderComponents(components) {
        if (components.length > 0) {
            return components.map(x => <option key={x.id} value={x.id}>{x.name}</option>)
        }
    }

    return (
        <FormGroup>
            <Label sm={2}>{componentType}</Label>
            <select type='number' onChange={(ev) => { onChangeFunction(ev.target.value) }}>
                <option>Select...</option>
                {renderComponents(components)}
            </select>
        </FormGroup>
    )
}

export default FilterComponent;