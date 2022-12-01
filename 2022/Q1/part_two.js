const {input} = require('./input');

console.log("Input length = " + input.length);

let max_1 = 0;
let max_2 = 0;
let max_3 = 0;

let curr_sum = 0;

for(let i=0; i<input.length; i++){
    // console.log(input[i]);
    if(input[i] == ''){
        if(curr_sum > max_1){
            max_3 = max_2;
            max_2 = max_1;
            max_1 = curr_sum;
        } else if(curr_sum > max_2){
            max_3 = max_2;
            max_2 = curr_sum;
        }else if(curr_sum > max_3){
            max_3 = curr_sum;
        }
        curr_sum = 0;
    } else {
        curr_sum += parseInt(input[i]);
    }
}

console.log(max_1, max_2, max_3);
console.log(max_1 + max_2 + max_3);

