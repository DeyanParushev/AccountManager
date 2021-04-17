import React from 'react';
import UserContext from '../../contexts/UserContext';
import { Delete } from '../..//services/ApiService';
import { ExtractComponentFromRoute, ExtractIdFromUrl } from '../../utilityFunctions/RoutingFunctions';

class DeleteTransaction extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const componentType = ExtractComponentFromRoute(this.props.match.path);
        const id = ExtractIdFromUrl(this.props.match.url);

        const deleteElement = async (id) => {
            const token = this.context.user.token;
            const result = await Delete(id, componentType, token);

            if (result.status === 200) {
                this.props.history.goBack();
            } else {
                console.log(result);
            }
        }

        if (!this.context.user.id) {
            this.props.history.push('/Identity/Login');
        }

        deleteElement(id);
    }

    render() {
        return <h1>Delete element</h1>;
    }
}

DeleteTransaction.contextType = UserContext;

export default DeleteTransaction;

