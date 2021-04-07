import React from 'react';
import { Alert } from 'reactstrap';

const Error = ({ message }) => {
    return (<Alert color="danger">{message}</Alert>)
}

export default Error;