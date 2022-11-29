const {input} = require('./input');

console.log("Input length = " + input.length);

const row_length = input[0].length;

console.log("Row length = " + row_length);

let bit_sums = new Array(row_length).fill(0);

function bin_array_to_dec(array){
    let sum = 0;
    for(let i=0; i<array.length; i++){
        sum += array[i] * Math.pow(2, array.length-i-1);
    }
    return sum;
}

function get_oxygen_rating(pos, array){

    if(array.length == 1){
        return array[0];
    }

    let zeros_array = [];
    let ones_array = [];
    let ones = 0;
    let zeros = 0;
    for(let i=0; i<array.length; i++){
        if(array[i][pos] == '0'){
            zeros += 1;
            zeros_array.push(array[i]);
        } else {
            ones += 1;
            ones_array.push(array[i]);
        }
    }

    // console.log("ones = " + ones + " zeros = " + zeros);

    if(ones >= zeros){
        // console.log("winner is 1s");
        return get_oxygen_rating(pos+1, ones_array);
    } else {
        // console.log("winner is 0s");
        return get_oxygen_rating(pos+1, zeros_array);
    }

}

function get_CO2_rating(pos, array){

    // console.log("depth = " + pos);
    // console.log(array);

    if(array.length == 1){
        return array[0];
    }

    let zeros_array = [];
    let ones_array = [];
    let ones = 0;
    let zeros = 0;
    for(let i=0; i<array.length; i++){
        if(array[i][pos] == '0'){
            zeros += 1;
            zeros_array.push(array[i]);
        } else {
            ones += 1;
            ones_array.push(array[i]);
        }
    }

    if(ones < zeros){
        return get_CO2_rating(pos+1, ones_array);
    } else {
        return get_CO2_rating(pos+1, zeros_array);
    }

}

let oxygen_bin = get_oxygen_rating(0, input);
let CO2_bin = get_CO2_rating(0, input);

console.log("Oxygen_bin = " + oxygen_bin + " CO2_bin = " + CO2_bin);

let oxygen = bin_array_to_dec(oxygen_bin);
let CO2 = bin_array_to_dec(CO2_bin);

console.log("Oxygen = " + oxygen + " CO2 = " + CO2 + " Prod = " + CO2*oxygen);