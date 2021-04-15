import React from 'react';
import { Button } from 'reactstrap';

function BackButton({ history }) {
    function backOnClickHandler() {
        history.goBack();
    }

    return (
        <Button outline color='primary' onClick={backOnClickHandler}>Back</Button>
    )
}

export default BackButton;