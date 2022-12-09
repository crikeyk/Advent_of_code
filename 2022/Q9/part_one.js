const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

let dir = ''
let num = 0

let H_pos = [0, 0];
let last_H = [0, 0];
let T_pos = [0, 0];

let T_visited = ["0_0"];
let num_visited = 1;

function update_head_position(dir, H_pos){
    switch(dir){
        case 'L':
            H_pos[0] -= 1;
            break;
        case 'R':
            H_pos[0] += 1;
            break;
        case 'U':
            H_pos[1] += 1;
            break;
        case 'D':
            H_pos[1] -= 1;
            break; 
    }
    return(H_pos);
}

function array_copy(arr){
    let new_arr = [];
    for(let i=0; i<arr.length;i++){
        new_arr.push(arr[i]);
    }

    return(new_arr);
}

function stringify_coords(pos){
    // console.log("converting ", pos, "to string")
    // console.log(pos[0])
    return(pos[0].toString() + "_" + pos[1].toString());
}

for(let i=0; i<input.length;i++){
    dir = input[i][0];
    num = parseInt(input[i].split(' ')[1]);
    // console.log("dir = ", dir, " num = ", num)
    for(let j=0; j<num;j++){
        last_H = array_copy(H_pos);
        H_pos = update_head_position(dir, H_pos);
        console.log("H = ", H_pos, " T = ", T_pos);
        if(Math.abs(H_pos[0] - T_pos[0]) > 1 || Math.abs(H_pos[1] - T_pos[1]) > 1){
            console.log("move T");
            T_pos = array_copy(last_H);
            if(!T_visited.includes(stringify_coords(T_pos))){
                T_visited.push(stringify_coords(T_pos));
                console.log(T_visited);
                num_visited++;
            }
        }
    }


}

console.log("Num visited = ", num_visited);