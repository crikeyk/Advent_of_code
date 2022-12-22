const {input} = require('./input');

console.log(input.length)

const dim = 30

image = tunnel = new Array(dim).fill(0).map(() => new Array(dim).fill(0).map(() => new Array(dim).fill(0)));

surface_area = 0

// min = [99, 99, 99]
// max = [0, 0, 0]

for(let i=0; i<input.length;i++){
    coord = input[i].split(',').map(x => +x)
    for(let j=0; j<3;j++){
        coord[j] += 2
    }
    image[coord[0]][coord[1]][coord[2]] += 1
}


outer_SA = 0

for(let iter=0; iter<dim;iter++){
    console.log("iteration ", iter)
    for(let i=0; i<dim;i++){
        for(let j=0; j<dim;j++){
            for(let k=0; k<dim;k++){
                coord = [i, j, k]
                if(image[coord[0]][coord[1]][coord[2]] == 0){

                    reaches_border = false
                    num_edge_touches = 0

                    for(let j=0; j<3;j++){
                        if(coord[j] == dim-1 || coord[j] == 0){
                            reaches_border = true
                            break
                        }
                        // console.log(coord, j)
                        next_piece_up = image[coord[0]+(j==0?1:0)][coord[1]+(j==1?1:0)][coord[2]+(j==2?1:0)]
                        next_piece_down = image[coord[0]-(j==0?1:0)][coord[1]-(j==1?1:0)][coord[2]-(j==2?1:0)]
                        if(next_piece_down == -1 || next_piece_up == -1){
                            reaches_border = true
                        }

                        if(next_piece_up > 0){
                            num_edge_touches += 1
                        }
                        if(next_piece_down > 0){
                            num_edge_touches += 1
                        }  
                    }

                    if(reaches_border){
                        // console.log("reaches_border")
                        image[coord[0]][coord[1]][coord[2]] = -1
                        outer_SA += num_edge_touches
                    }
                }
            }
        }
    }
}


console.log("outer surface area = ", outer_SA)