const { constants } = require('buffer');
const {input} = require('./input');

map_height = input.length
map_width = input[0].length

console.log("Map height = " + map_height);
console.log("Map width = " + map_width);

let start_pos = [0, 0]
let end_pos = [0, 0]

const max_dist = 9999999

let moves = [[-1, 0], [1, 0], [0, -1], [0, 1]]
var shortest_path_map = [...Array(map_height)].map(e => Array(map_width).fill(max_dist));

for(let i=0; i<input.length;i++){
    for(let j=0; j<input[0].length;j++){
        if(input[i][j] == 'S'){
            start_pos[0] = i;
            start_pos[1] = j;
        } else if (input[i][j] == 'E'){
            end_pos[0] = i;
            end_pos[1] = j;
        }
    }
}

console.log("starting pos is ", start_pos)
console.log("ending pos is ", end_pos)

function get_elevation(pos){
    let char_val = input[pos[0]][pos[1]]
    if(char_val == 'S'){
        char_val = 'a'
    } else if (char_val == 'E'){
        char_val = 'z'
    }
    return(char_val.charCodeAt(0))
}

function get_shortest_path(pos, dist){

    shortest_path_map[pos[0]][pos[1]] = dist;

    let current_elevation = get_elevation(pos)
    let next_move_dist = 0

    for(let move=0;move<4;move++){
        let next_move = [pos[0]+moves[move][0], pos[1]+moves[move][1]]
        if(next_move[0] >= 0 && next_move[0] < map_height && next_move[1] >= 0 && next_move[1] < map_width){  //move within map
            if(get_elevation(next_move) <= current_elevation + 1 && shortest_path_map[next_move[0]][next_move[1]] > dist + 1){ // can reach
                next_move_dist = get_shortest_path(next_move, dist + 1)
            }
        }
    }
}

get_shortest_path(start_pos, 0)

console.log("shortest path is ", shortest_path_map[end_pos[0]][end_pos[1]])
