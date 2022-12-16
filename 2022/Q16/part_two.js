const {input} = require('./input');

input_length = input.length

max_range = 4000000

function distance(coord_1, coord_2){
    return(Math.abs(coord_1[0]-coord_2[0]) + Math.abs(coord_1[1]-coord_2[1]))
}

function get_intercept(pt_1, pt_2){
    n = ((pt_2[0] + pt_2[1]) - (pt_1[0] + pt_1[1]))/2
    return [[pt_1[0]+n, pt_1[1]+n], [pt_2[0]-n, pt_2[1]-n]]
}

lines = []

for(let i=0; i<input.length;i++){     
    sensor_location = input[i].match(/Sensor at x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(x => +x)
    beacon_location = input[i].match(/closest beacon is at x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(x => +x)
    lines.push([sensor_location[0], sensor_location[1] + distance(beacon_location, sensor_location) + 1])
    lines.push([sensor_location[0], sensor_location[1] - distance(beacon_location, sensor_location) - 1])
}

intercepts = []

for(let i=0; i<lines.length-1;i++){
    for(let j=i+1; j<lines.length;j++){
        int_tmp = get_intercept(lines[i], lines[j])
        if(int_tmp[0][0] > 0 && int_tmp[0][0] < max_range && int_tmp[0][1] > 0 && int_tmp[0][1] < max_range){
            if(Number.isInteger(int_tmp[0][0]) && Number.isInteger(int_tmp[0][1])){
                // console.log("0, ", int_tmp[0])
                intercepts.push(int_tmp[0])
            }
        }
        if(int_tmp[1][0] > 0 && int_tmp[1][0] < max_range && int_tmp[1][1] > 0 && int_tmp[1][1] < max_range){
            if(Number.isInteger(int_tmp[1][0]) && Number.isInteger(int_tmp[1][1])){
                // console.log("1, ", int_tmp[1])
                intercepts.push(int_tmp[1])
            }
        }
    }
}

for(let i=0; i<intercepts.length-1;i++){
    lost_beacon = true
    for(let j=0; j<input.length;j++){
        sensor_location = input[j].match(/Sensor at x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(x => +x)
        beacon_location = input[j].match(/closest beacon is at x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(x => +x)
        // console.log(intercepts[i], "dist to sensor ", distance(intercepts[i], sensor_location), " dist to beacon ", distance(beacon_location, sensor_location))
        if(distance(intercepts[i], sensor_location) <= distance(beacon_location, sensor_location)){
            // console.log("is not ", intercepts[i])
            lost_beacon = false
            break
        }
    }
    if(lost_beacon){
        console.log(intercepts[i], intercepts[i][0]*4000000+intercepts[i][1])
        break
    }
}
