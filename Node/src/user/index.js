let Logger = require('../logger')(module);

class User {
    constructor(name) {
        this._name = name;
    }

    get name() {
        return this._name;
    }

    set name(val) {
        this._name = val; 
    }

    hello(u2) {
        Logger.log(`${this.name} greets ${u2.name}`);
    }
}

module.exports = User;
