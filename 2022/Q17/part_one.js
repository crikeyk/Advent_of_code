const {input} = require('./input');

const input_width = input[0].length


function draw_tunnel(tunnel){
    for(let i=tunnel.length-1; i>=0;i--){
        row = tunnel[i]
        process.stdout.write("|");
        for(let j=0; j<row.length;j++){
            process.stdout.write(row[j]);
        }
        process.stdout.write("|\n");
    }
    process.stdout.write("+");

    for(let j=0; j<row.length;j++){
        process.stdout.write('-');
    }
    process.stdout.write("+\n");
}


function draw_tunnel_with_rock(tunnel, rock, position){

    for(let i=tunnel.length-1; i>=0;i--){
        row = tunnel[i]
        process.stdout.write("|");
        for(let j=0; j<row.length;j++){
            try{
                process.stdout.write(rock[i-position[1]][j-position[0]]);
            }
            catch {
                process.stdout.write(row[j]);
            }
            // process.stdout.write(row[j]);
        }
        process.stdout.write("|\n");
    }
    process.stdout.write("+");

    for(let j=0; j<row.length;j++){
        process.stdout.write('-');
    }
    process.stdout.write("+\n");
}

rocks = [
    [['#','#','#', '#']],
    [['.','#','.'],
     ['#','#','#'],
     ['.','#','.']],
    [['#','#','#'],
     ['.','.','#'],
     ['.','.','#']],
    [['#'],
     ['#'],
     ['#'],
     ['#']],
    [['#', '#'],
     ['#', '#']]
]

function collides(tunnel, rock, position){

    if(position[0] < 0 || position[1] < 0 || position[0] + rock[0].length > tunnel_width){
        return true
    }

    for(let i=0; i<rock.length;i++){
        for(let j=0; j<rock[i].length;j++){
            // console.log(position[1] + i, position[0] + j, tunnel.length)
            if(rock[i][j] == '#' && (position[1] + i < tunnel.length && tunnel[position[1] + i][position[0] + j] != '.')){
                return true
            }
        }
    }
    return false
}

function add_rock(tunnel, rock, position, char){
    for(let i=0; i<rock.length;i++){
        for(let j=0; j<rock[i].length;j++){
            if(rock[i][j] == '#'){
                tunnel[position[1] + i][position[0] + j] = char            
            }
        }
    }
}
const tunnel_width = 7
const num_rocks = 2022
let highest_rock = -1
input_num = 0

tunnel = new Array(3).fill(0).map(() => new Array(tunnel_width).fill("."));


for(let rock_number=0; rock_number<num_rocks;rock_number++){
    settled = false
    rock_position = [2, highest_rock+4]
    rock = rocks[rock_number%rocks.length]
    while(rock_position[1] + rock.length-1 >= tunnel.length){
        tunnel.push(new Array(tunnel_width).fill("."))
    }
    while(!settled){
        // draw_tunnel_with_rock(tunnel, rock, rock_position)

        gas_move = input[0][input_num%input_width] == '>' ? 1:-1
        input_num++

        next_position = [rock_position[0] + gas_move, rock_position[1]]
        if(!collides(tunnel, rock, next_position)){
            rock_position[0] = next_position[0]
            // console.log("slide,", gas_move)
        } else {
            // console.log("no slide")
        }
        // draw_tunnel_with_rock(tunnel, rock, rock_position)


        next_position = [rock_position[0], rock_position[1]-1]
        if(!collides(tunnel, rock, next_position)){
            rock_position[1] = next_position[1]
            // console.log("fall")
        } else {
            add_rock(tunnel, rock, rock_position, '@')
            settled = true
            highest_rock = Math.max(highest_rock, rock_position[1]+rock.length-1)
            // console.log(highest_rock)
            // console.log("no fall")
            break
        }
        


    }
    // draw_tunnel(tunnel)
}

console.log(highest_rock+1)

// draw_tunnel(tunnel)