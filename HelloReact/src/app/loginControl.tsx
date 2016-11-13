/// <reference path="interfaces.d.ts" />
import * as React from 'react';

export class LoginControl extends React.Component<ILoginProps, ILoginState> {
    constructor(isLogged) {
        super(isLogged);
        this.state = isLogged;
    }

    handleLogin = (e) => {
        this.setState( (oldState) => ({isLogged: true}) );
    }

    handleLogOut = (e) => {
        this.setState( (oldState) => ({isLogged: false}) );
    }    

    render() {
        const st = this.state.isLogged;

        return (
            <div>
                <Greeting isLoggedIn={st} />&nbsp;
                {st ? 
                    (<LogoutButton onClick={this.handleLogOut} />):
                    (<LoginButton onClick={this.handleLogin} />)
                }
            </div>
        );
    }
}

const Greeting = ({isLoggedIn}) => {
        return <span>{isLoggedIn ? 'User is logged':'User is out'}</span>;        
    }; 

const LogoutButton = (props) => {
    return (
        <button onClick={props.onClick}>Logout</button>
    );    
}

const LoginButton = (props) => {
    return (
        <button onClick={props.onClick}>Login</button>
    );    
}
