import React, { Fragment } from 'react';
import BackButton from '../utilities/BackButton';
function ErrorPage({ history }) {
    return (
        <Fragment>
            <h1><b>Error 404</b></h1>
            <br></br>
            <h3>The page you are looking for does not exist.</h3>
            <BackButton history={history} />
        </Fragment>
    )
}

export default ErrorPage;