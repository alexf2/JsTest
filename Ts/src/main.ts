import {sayHello} from "./greet"; 

function hello1(hostId: string, compiler: string) {
    //console.log(`Hello from ${compiler}`);    
    document.getElementById(hostId).textContent = sayHello(compiler);
}

hello1('greeting', 'TypeScript');
