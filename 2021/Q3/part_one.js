const {input} = require('./input');

console.log("Input length = " + input.length);

const row_length = input[0].length;

console.log("Row length = " + row_length);

let bit_sums = new Array(row_length).fill(0);

for(let i=0; i<input.length; i++){
    row = input[i];
    for(let j=0; j<row_length; j++){
        if(row[j] == '0'){
            bit_sums[j] -= 1;
        } else if (row[j] == '1') {
            bit_sums[j] += 1;
        } else {
            console.log("Error at " + bit_sums[j]);
        }
    }
}

console.log(bit_sums)

let gamma = 0;
let epsilon = 0;

for(let i=0; i<row_length; i++){
    if(bit_sums[i] > 0){
        gamma += Math.pow(2, row_length-i-1);
    } else {
        epsilon += Math.pow(2, row_length-i-1);
    }
}

console.log("Gamma = " + gamma + " Epsilon = " + epsilon + " Product = " + gamma * epsilon);