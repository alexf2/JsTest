'use strict';

var FF = (
  function() {
	function FF(name) {
  	this.stateKey = Symbol();
		this[this.stateKey] = {cnt: 0, n: name};
  }
  
  FF.prototype.getCnt = function() {
  	return this[ this.stateKey ].cnt;
  }
  
  FF.prototype.sayHello = function() {
  	return 'Hello ' + this[ this.stateKey ].n;
  }
  
  FF.prototype.inc = function(i) {
  	this[this.stateKey].cnt += i;
  }
  
   return FF;
 }
)();


var f1 = new FF('n1'), f2 = new FF('n2');

f1.inc(2);
f2.inc(12);
f1.inc(3);

console.log(f1.sayHello());
console.log(f2.sayHello());

console.log(f1.getCnt());
console.log(f2.getCnt());

