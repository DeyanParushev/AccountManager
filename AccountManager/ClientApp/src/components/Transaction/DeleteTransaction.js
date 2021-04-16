import React from 'react';
import UserContext from '../../contexts/UserContext';
import { Delete } from '../..//services/ApiService';
import { ExtractComponentFromRoute } from '../../utilityFunctions/RoutingFunctions';

class Logout extends React.Component {
    constructor(props) {
        super(props);
        componentType = props.componentType;
        history = props.history;
    }

    componentDidMount() {
        const componentType = ExtractComponentFromRoute(match.path);


        async function deleteElement(id) {
            const result = await Delete(id, this.componentType, this.context.user.token);

            if (result.status === 200) {
                this.history.push(`/Accounts/Details/${accountId}`)
            } else {
                console.log(result);
            }
        }

        deleteElement();
    }

    render() {
        return null;
    }
}

Logout.contextType = UserContext;

export default Logout;

