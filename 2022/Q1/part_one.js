const {input} = require('./input');

console.log("Input length = " + input.length);

let max = 0;
let curr_sum = 0;

for(let i=0; i<input.length; i++){
    // console.log(input[i]);
    if(input[i] == ''){
        if(curr_sum > max){
            max = curr_sum;
        }
        curr_sum = 0;
    } else {
        curr_sum += parseInt(input[i]);
    }
}

console.log(max);
