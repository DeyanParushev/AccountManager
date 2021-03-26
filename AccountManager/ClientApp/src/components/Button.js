import React from 'react';

function Button(props) {
    return (
        <button type={props.type}>{props.displayName}</button>
    )
}

export default Button;