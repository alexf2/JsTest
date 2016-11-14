/// <reference path="interfaces.d.ts" />
import * as React from 'react';

class Greeting extends React.Component<any, null> {
    render() {
        return <span>{this.props.isLoggedIn ? 'User is logged' : 'User is out'}</span>;
    }
};

const LogoutButton = (props) => {
    return (
        <button onClick={props.onClick}>Logout</button>
    );
};

const LoginButton = (props) => {
    return (
        <button onClick={props.onClick}>Login</button>
    );
};

export class LoginControl extends React.Component<ILoginProps, ILoginState> {
    constructor(isLogged) {
        super(isLogged);
        this.state = isLogged;
    }

    handleLogin = (e) => {
        this.setState((oldState) => ({ isLogged: true }));
        console.log(`LoginControl mounted: refs = ${this.refs['refGreeting']}`);
        console.log(`LoginControl mounted: refs = ${(this.refs['refGreeting2'] as React.Component<any, null>).props.isLoggedIn}`);
    }

    handleLogOut = (e) => {
        this.setState((oldState) => ({ isLogged: false }));
    }

    render() {
        const st = this.state.isLogged;

        return (
            <div ref = 'refGreeting' >
                <Greeting ref = 'refGreeting2' isLoggedIn={st} />&nbsp;
                {st ?
                    (<LogoutButton onClick={this.handleLogOut} />) :
                    (<LoginButton onClick={this.handleLogin} />)
                }
            </div>
        );
    }

    protected componentDidMount() {  }
}

