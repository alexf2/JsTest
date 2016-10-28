class Logger {
    constructor(m) {this._m = m;}

    log(...args) {
        console.log(this._m.filename, ...args);
    }
}

module.exports = function(m) {
    return new Logger(m);
};