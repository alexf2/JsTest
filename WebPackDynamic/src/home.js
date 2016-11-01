'use strict';

import './css/style.css';
import welcome from './welcome';
//import _ from 'lodash';

welcome("home");

function doLogin() {
    require.ensure([], function(require)  {    
        let login = require('./login');
        login();
    }, "auth");
}

function doLogout() {
    require.ensure([], function(require)  {    
        let logout = require('./logout');
        logout();
    }, "auth");
}

function getUsers() {
    let users = [
        {id: 1, name: 'n1'},
        {id: 2, name: 'n2'},
        {id: 3, name: 'n3'},
    ];

    
    //return _.shuffle(users);
    return shuffle(users);
}

export {welcome, doLogin, doLogout, getUsers};
