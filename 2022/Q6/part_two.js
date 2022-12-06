const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

const row_length = input[0].length;

console.log(row_length);

function is_different(array){
    // console.log(array);
    for(let i=0; i<array.length-1; i++){
        for(let j=i+1; j<array.length; j++){
            if(array[i] == array[j]){
                return false
            }
        }
    }

    return true

}

for(let i=14; i<row_length; i++){
    let slice = input[0].slice(i-14, i);
    if(is_different(slice)){
        console.log("start bit at ", i);
        break
    }
}

// console.log(stacks)
