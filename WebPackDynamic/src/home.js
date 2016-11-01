'use strict';

import welcome from './welcome';

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

export {welcome, doLogin, doLogout};
