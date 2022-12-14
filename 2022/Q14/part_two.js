const {input} = require('./input');

input_length = input.length

// const x_range = [462, 534]
// const y_range = [13, 171]

const y_range = [0, 173]
// const y_range = [0, 11]


const x_range = [500 - y_range[1]-1, 500 + y_range[1] + 1]


function draw_map(map){
    for(let i=0; i<map.length;i++){
        row = map[i]
        for(let j=0; j<row.length;j++){
            process.stdout.write(row[j]);
        }
        process.stdout.write("\n");
    }
}

let map = [...Array(y_range[1]+3)].map(e => Array(x_range[1] - x_range[0]).fill('.'));

console.log("Input length = " + input_length);

function map_set(coord, val){
    // console.log(coord, x_range, y_range)
    map[coord[1]][coord[0]-x_range[0]] = val
}

function map_get(coord){
    return(map[coord[1]][coord[0]-x_range[0]])
}

function draw_line(line){
    let coords = line.split(" ->")
    // console.log(coords)
    let coord = []
    let last_coord = coords[0].split(',').map(x=>+x)
    for(let i=1; i<coords.length;i++){
        coord = coords[i].split(',').map(x=>+x)

        // x_range[0] = Math.min(x_range[0], coord[0])
        // x_range[1] = Math.max(x_range[1], coord[0])
        // y_range[0] = Math.min(y_range[0], coord[1])
        // y_range[1] = Math.max(y_range[1], coord[1])
        while((last_coord[0] != coord[0]) || (last_coord[1] != coord[1])){
            // console.log("last coord = ", last_coord, " coord = ", coord)
            map_set(last_coord, '#')
            if(last_coord[0] == coord[0]){
                last_coord[1] = last_coord[1] + (last_coord[1]<coord[1] ? 1 : -1)
            } else {
                last_coord[0] = last_coord[0] + (last_coord[0]<coord[0] ? 1 : -1)
            }
        }        
    }
    map_set(last_coord, '#')
}

for(let i=0; i<input_length;i++){
    draw_line(input[i])
}

draw_line(`${x_range[0]}, ${y_range[1]} -> ${x_range[1]}, ${y_range[1]}`)


// draw_map(map)

let free_fall = false
let at_rest = false
let sand_pos = [500,0]

let sand_at_rest = 0

while(!free_fall){
    sand_pos = [500, 0]
    at_rest = false

    while(!at_rest){

        if(sand_pos[1] >= y_range[1]){
            at_rest = true
            free_fall = true
        }

        if(map_get([sand_pos[0], sand_pos[1]+1]) == '.'){
            sand_pos[1] += 1
        } else if(map_get([sand_pos[0]-1, sand_pos[1]+1]) == '.'){
            sand_pos[1] += 1
            sand_pos[0] -= 1
        } else if(map_get([sand_pos[0]+1, sand_pos[1]+1]) == '.'){
            sand_pos[1] += 1
            sand_pos[0] += 1
        } else {
            map_set(sand_pos, 'o')
            at_rest = true
            sand_at_rest += 1
            if(sand_pos[1] == 0){
                free_fall = true
            }
        }
    }

}

draw_map(map)

console.log(sand_at_rest)
