import {sayHello} from "./greet"; 
import * as w from "./Wallet";
import * as iw from "./IWallet";

function hello1(hostId: string, compiler: string) {
    //console.log(`Hello from ${compiler}`);    
    document.getElementById(hostId).textContent = sayHello(compiler);
}

function testWallet (w: iw.IWallet) {
    console.log(`Source amount: ${w.amount}`);

    w.credit(120);
    w.credit(30);

    console.log(`Amount: ${w.amount}`);

    console.log(w.debit(80));
    console.log(`Amount2: ${w.amount}`);

    console.log(w.debit(180));
    console.log(`Amount3: ${w.amount}`);

    console.log(w.debit(90));
    console.log(`Amount4: ${w.amount}`);

    console.log(w.debit(300));
    console.log(`Amount5: ${w.amount}`);
}

hello1('greeting', 'TypeScript');

//test interfaces
testWallet(new w.Wallet(290));

class Tst {
    constructor(a:number, b:number, c:number = 10) {
        this.a = a;
        this.b=b;
        this.c = c;
    }

    a: number;
    b: number;
    c: number;
}

function tt({a, c}: {a:number, c:number}){
    console.log(a + c);
}

//test destructuring
tt(new Tst(1, 2));

var {a, b} = new Tst(11, 12);
console.log('a=' + a);  
console.log('b=' + b);

