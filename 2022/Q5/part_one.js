const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

const row_length = input[0].length;

const num_stacks = 9

let stacks = []


function shift_stacks(command, stacks){

    let coms = command.split(' ');
    // console.log("comms", coms);
    let num = parseInt(coms[1]);
    let from_stack = parseInt(coms[3])-1;
    let to_stack = parseInt(coms[5])-1;
    console.log(num, from_stack, to_stack);
    console.log(stacks[from_stack], stacks[to_stack]);
    let pop = 0;

    for(let i=0; i<num; i++){
        pop = stacks[from_stack].pop();
        stacks[to_stack].push(pop[0]);
    }

    console.log(num, from_stack, to_stack);
    console.log(stacks[from_stack], stacks[to_stack]);

    return stacks;
}

for(let i=0; i<num_stacks; i++){
    stacks.push([])
}

let row_num = 0

while(input[row_num] != ""){
    let row = input[row_num];
    // console.log(row);
    for(let i=0; i<row.length; i++){
        if(i%4 == 1){
            // console.log(row[i], (i-1)/4);
            if(row[i] != ' '){
                stacks[(i-1)/4].unshift(row[i]);
            }
        }
    }

    row_num++;
}

row_num++;


for(let i=0; i<num_stacks; i++){
    stacks[i].shift();
}


// console.log(stacks)

for(let i=row_num; i<input.length; i++){
    console.log("number =", i);
    if(input[i][0] == 'm'){
        stacks = shift_stacks(input[i], stacks);
    }
    // console.log(stacks);
}
// console.log(stacks)


for(let i=0; i<num_stacks; i++){
    console.log(stacks[i].slice(-1))
}

// console.log("num = " + num_fully_contained);
