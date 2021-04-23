import React, { Fragment, useState } from 'react';
import BackButton from '../utilities/BackButton';

function EditAccount({ match, history }) {

    return (
        <Fragment>
            <h1>Edit</h1>
            <BackButton history={history} />
        </Fragment>
    )
}

export default EditAccount;