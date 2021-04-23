import React from 'react';
import UserContext from '../../contexts/UserContext';
import { LogoutService } from '../..//services/AuthServices';
import ApplicationRoutes from './ApplicationRoutes';

class Logout extends React.Component {
    componentDidMount() {
        LogoutService(this.context.user)
            .then(result => {
                if (result.status === 200) {
                    this.context.setUser({});
                    this.props.props.history.push(ApplicationRoutes.Home);
                }
            })
            .catch(exeption => {
                console.log(exeption);
            });
    }

    render() {
        return null;
    }
}

Logout.contextType = UserContext;

export default Logout;

