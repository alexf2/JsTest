// В какой момент срабатывают - до или после чтения файла?
const fs = require('fs');

console.log('init');

fs.open(__filename, 'r', (err, fd) => {
  console.log('IO!'); 
});

   setImmediate(() => {
     console.log('immediate'); 
   });

   new Promise(resolve => {
     resolve('promise'); 
   }).then(console.log('promise then')  );

  process.nextTick(() => {
    console.log('nextTick1'); 
  });

  process.nextTick(() => {
    console.log('nextTick2'); 
  });


console.log('start!'); 
