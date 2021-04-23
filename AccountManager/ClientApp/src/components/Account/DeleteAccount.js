import React, { Fragment, useState } from 'react';

import { ExtractIdFromUrl } from '../../utilityFunctions/RoutingFunctions';
import BackButton from '../utilities/BackButton';

function DeleteAccount({ match, history }) {
    const id = ExtractIdFromUrl(match.url);
    console.log(id);

    return (
        <Fragment>
            <h1>Delete Account</h1>
            <BackButton history={history} />
        </Fragment>
    )
}

export default DeleteAccount;