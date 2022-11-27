// the hello world program

const {input} = require('./input')

let count = 0;

for(let i = 0;i<input.length-3;i++){
    if(input[i+1]+input[i+2]+input[i+3] > input[i]+input[i+1]+input[i+2] ){
        count += 1;
    }
}
console.log(count);
// document.write("hello world doc")