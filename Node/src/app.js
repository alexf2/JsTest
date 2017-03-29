let User = require('./user');
let Logger = require('./logger')(module); //модуль публикует фабрику

let EE = require('events').EventEmitter;
let util = require('util');
let url = require('url');

let server = new EE;

const EV_REQUEST = 'request';

function run() {
  try {
    let u1 = new User('Петя');
    let u2 = new User('Вася');

    u1.hello(u2);

    server.emit(EV_REQUEST, {from: 'Вася'});    
    server.emit(EV_REQUEST, {from: 'Петя'});
  }
  finally {
    server.removeAllListeners('re')
  }
}

console.log( url.parse('http://abc.hjh.com:128/yyy/c') )

server.on(EV_REQUEST, req => req.approved = true);
server.on(EV_REQUEST, req => console.log(util.inspect(req)));

if (module.parent) 
  exports.run = run;
else {
  Logger.log('Starting...');
   run();
   Logger.log('Started...');
}

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);


let v = 'xxghпр%20%20YY';
console.log(v)
console.log(unescape(v))
console.log(decodeURI(v))
