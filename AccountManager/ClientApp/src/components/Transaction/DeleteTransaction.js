import React from 'react';
import UserContext from '../../contexts/UserContext';
import { Delete } from '../..//services/ApiService';
import { ExtractComponentFromRoute, ExtractIdFromUrl } from '../../utilityFunctions/RoutingFunctions';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';

class DeleteTransaction extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const componentType = ExtractComponentFromRoute(this.props.match.path);
        const id = ExtractIdFromUrl(this.props.match.url);

        if (!this.context.user.id) {
            this.props.history.push(ApplicationRoutes.Login);
        }
        
        const deleteElement = async (id) => {
            const token = this.context.user.token;
            const result = await Delete(id, componentType, token);

            if (result.status === 200) {
                this.props.history.goBack();
            } else {
                console.log(result);
            }
        }

        deleteElement(id);
    }

    render() {
        return <h1>Deleting element...</h1>;
    }
}

DeleteTransaction.contextType = UserContext;

export default DeleteTransaction;

