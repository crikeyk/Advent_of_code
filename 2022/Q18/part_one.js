const {input} = require('./input');

console.log(input.length)

const dim = 25

image = tunnel = new Array(dim).fill(0).map(() => new Array(dim).fill(0).map(() => new Array(dim).fill(0)));

surface_area = 0

min = [99, 99, 99]
max = [0, 0, 0]

for(let i=0; i<input.length;i++){
    coord = input[i].split(',').map(x => +x)
    for(let j=0; j<3;j++){
        coord[j] += 1
    }
    surface_area += 6
    console.log(coord)
    image[coord[0]][coord[1]][coord[2]] += 1
    for(let j=0; j<3;j++){
        max[j] = Math.max(max[j], coord[j])
        min[j] = Math.min(min[j], coord[j])

        if(image[coord[0]+(j==0?1:0)][coord[1]+(j==1?1:0)][coord[2]+(j==2?1:0)] != 0){
            // console.log("Touching ", [coord[0]+(j==0?1:0)],[coord[1]+(j==1?1:0)],[coord[2]+(j==2?1:0)])
            surface_area -= 2
        }
        if(image[coord[0]-(j==0?1:0)][coord[1]-(j==1?1:0)][coord[2]-(j==2?1:0)] != 0){
            // console.log("Touching ", [coord[0]-(j==0?1:0)],[coord[1]-(j==1?1:0)],[coord[2]-(j==2?1:0)])
            surface_area -= 2
        }
    }
}
// console.log(image)
console.log("extent", min, max)
console.log(surface_area)