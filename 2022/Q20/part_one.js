const {input} = require('./input');

list_length = input.length

numbers = []

for(let i=0; i<input.length;i++){
    numbers.push(parseInt(input[i]))
}

console.log(list_length)
console.log(numbers)