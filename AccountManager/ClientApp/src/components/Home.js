import * as React from 'react';

export class Home extends React.Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Hello to Account Manager</h1>
                <p>Your free app for tracking your personal funds!!</p>
            </div>
        );
    }
}
