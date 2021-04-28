import React, { Fragment, useEffect, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { ExtractComponentFromRoute, ExtractIdFromUrl } from '../../utilityFunctions/RoutingFunctions';
import BackButton from '../utilities/BackButton';
import ApplicationRoutes from '../api-authorization/ApplicationRoutes';
import { Delete } from '../../services/ApiService';

function DeleteAccount({ match, history }) {
    const context = useContext(UserContext);

    useEffect(() => {
        const componentType = ExtractComponentFromRoute(match.path);
        const id = ExtractIdFromUrl(match.url);

        if (!context.user.id) {
            history.push(ApplicationRoutes.Login);
        }

        const deleteElement = async (id) => {
            const token = context.user.token;
            const result = await Delete(id, componentType, token);

            if (result.status === 200) {
                history.push(ApplicationRoutes.Accounts.All);
            } else {
                const error = await result.json();
                console.log(error);
            }
        }

        deleteElement(id);
    });

    return (
        <Fragment>
            <h1>Delete Account</h1>
            <BackButton history={history} />
        </Fragment>
    )
}

export default DeleteAccount;