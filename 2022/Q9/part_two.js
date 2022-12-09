const { constants } = require('buffer');
const { toASCII } = require('punycode');
const {input} = require('./input');

console.log("Input length = " + input.length);

let dir = ''
let num = 0

let rope_pos = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
let last_H = [0, 0];

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
    return(pos[0].toString() + "_" + pos[1].toString());
}

function move_seg(head, tail){
    if(Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1){
        if(head[0] != tail[0]){
            tail[0] += head[0] > tail[0] ? 1 : -1;
        }
        if (head[1] != tail[1]){
            tail[1] += head[1] > tail[1] ? 1 : -1;
        }
        // console.log("seg is now ", seg)
    } 
    return(tail);
    
}

let ret = []

for(let i=0; i<input.length;i++){
    dir = input[i][0];
    num = parseInt(input[i].split(' ')[1]);
    // console.log("dir = ", dir, " num = ", num)
    for(let j=0; j<num;j++){
        rope_pos[0] = update_head_position(dir, rope_pos[0]);
        // console.log("head is at ", rope_pos[0])
        for(let seg_n=1;seg_n<10;seg_n++){
            rope_pos[seg_n] = move_seg(rope_pos[seg_n-1], rope_pos[seg_n])
            // console.log("ret is ", ret[0])
            // rope_pos[seg_n] = array_copy(ret[0])
            // last_H = array_copy(ret[1])
            // console.log("moved segment ", seg_n, " to ", rope_pos[seg_n])
            if(seg_n == 9 && !T_visited.includes(stringify_coords(rope_pos[9]))){
                    T_visited.push(stringify_coords(rope_pos[9]));
                    console.log("new pos ", stringify_coords(rope_pos[9]));
                    num_visited++;
            }
        }
        // console.log("H = ", H_pos, " T = ", T_pos);

    }

}

console.log("Num visited = ", num_visited);
// console.log(T_visited)