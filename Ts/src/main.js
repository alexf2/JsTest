"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var greet_1 = require("./greet");
var w = require("./Wallet");
var milesTest_1 = require("./milesTest");
var aclass_1 = require("./aclass");
function hello1(hostId, compiler) {
    //console.log(`Hello from ${compiler}`);    
    document.getElementById(hostId).textContent = greet_1.sayHello(compiler);
}
function testWallet(w) {
    console.log("Source amount: " + w.amount);
    w.credit(120);
    w.credit(30);
    console.log("Amount: " + w.amount);
    console.log(w.debit(80));
    console.log("Amount2: " + w.amount);
    console.log(w.debit(180));
    console.log("Amount3: " + w.amount);
    console.log(w.debit(90));
    console.log("Amount4: " + w.amount);
    console.log(w.debit(300));
    console.log("Amount5: " + w.amount);
}
hello1('greeting', 'TypeScript');
//test interfaces
testWallet(new w.Wallet(290));
var Tst = (function () {
    function Tst(a, b, c) {
        if (c === void 0) { c = 10; }
        this.a = a;
        this.b = b;
        this.c = c;
    }
    return Tst;
}());
function tt(_a) {
    var a = _a.a, c = _a.c;
    console.log(a + c);
}
//test destructuring
tt(new Tst(1, 2));
var _a = new Tst(11, 12), a = _a.a, b = _a.b;
console.log('a=' + a);
console.log('b=' + b);
milesTest_1.default(25, "YARDS");
console.log(new aclass_1.default('tst', 100).name);
//# sourceMappingURL=main.js.map