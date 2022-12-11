const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

let X = 1;
let cycle = 0;
let input_arr = [];
let num_cycles = 0;
let signal_strength = 0;
let total_signal_strength = 0;

let cycles = [20, 60, 100, 140, 180, 220]

for(let i=0; i<input.length;i++){
    // console.log(input[i])
    input_arr = input[i].split(' ');
    if(input_arr[0] == 'noop'){
        num_cycles = 1;
    } else if (input_arr[0] == 'addx'){
        num_cycles = 2;
    }

    for(let j=0; j<num_cycles;j++){
        // console.log("cycle = ", cycle, " X = ", X, " total = ", total_signal_strength)

        cycle += 1;
        // if(cycle%20 == 0 && cycle > 1){
        if(cycles.includes(cycle)){
            signal_strength = X*cycle;
            total_signal_strength += signal_strength;
            console.log("cycle = ", cycle, " X = ", X, " signal_strenght = ", signal_strength)
        }
    }

    if(input_arr[0] == 'addx'){
        X += parseInt(input_arr[1]);
    }


}

console.log("Total = ", total_signal_strength);