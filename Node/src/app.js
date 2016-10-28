let User = require('./user');
let Logger = require('./logger')(module);

function run() {
  let u1 = new User('Петя');
  let u2 = new User('Вася');

  u1.hello(u2);  
}

if (module.parent) 
  exports.run = run;
else {
  Logger.log('Starting...');
   run();
   Logger.log('Started...');
}
