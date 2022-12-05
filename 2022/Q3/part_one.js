const {input} = require('./input');

console.log("Input length = " + input.length);

const row_length = input[0].length;

console.log("Row length = " + row_length);

let priority_sum = 0;

function get_unique_item(sack){
    sack_size = sack.length/2;
    for(let i=0; i<sack_size; i++){
        for(let j=0; j<sack_size; j++){
            if(sack[i] == sack[sack_size + j]){
                return(sack[i]);
            }
        }
    }
}

function get_priority(letter){
    value = letter.charCodeAt(0);
    if (value > 96){
        return value - 96;
    } else {
        return value - 38;
    }
}

for(let i=0; i<input.length; i++){
    row = input[i];
    item = get_unique_item(row);
    // console.log("unique item is " + item);
    priority = get_priority(item);
    // console.log("priority is " + priority);
    priority_sum += priority;

}

console.log("sum = " + priority_sum);

// console.log(get_priority('A'));