import React from 'react';
import AuthService from './api-authorization/AuthServices';

function InputField(props) {
    return (
        <div>
            <label htmlFor={props.name} name={props.name}>{props.displayName}</label>
            <input type={props.type} name={props.name} />
        </div>
    );
}

export default InputField;