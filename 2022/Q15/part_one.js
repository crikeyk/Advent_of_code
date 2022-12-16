const { machine } = require('os');
const {input} = require('./input');

input_length = input.length

search_row = 2000000
cannot_exist_ranges = []
beacons_in_row = []

max_range = [9999999999, -99999999999]

for(let i=0; i<input.length;i++){
    // console.log(input[i])
    sensor_location = input[i].match(/Sensor at x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(x => +x)
    beacon_location = input[i].match(/closest beacon is at x=(-?\d+), y=(-?\d+)/).slice(1, 3).map(x => +x)
    // console.log(sensor_location, beacon_location)
    distance_to_beacon = Math.abs(sensor_location[0]-beacon_location[0]) + Math.abs(sensor_location[1]-beacon_location[1])
    // console.log(`Distance = ${distance_to_beacon}`)

    y_diff = Math.abs(search_row - sensor_location[1])
    block_width = distance_to_beacon - y_diff

    if(block_width >= 0){
        cannot_exist_ranges.push([sensor_location[0] - block_width, sensor_location[0] + block_width])
        // console.log(`Block width = [${sensor_location[0] - block_width}, ${sensor_location[0] + block_width}]`)
        max_range[0] = Math.min(max_range[0], sensor_location[0] - block_width)
        max_range[1] = Math.max(max_range[1], sensor_location[0] + block_width)
    }

    if(beacon_location[1] == search_row && !beacons_in_row.includes(beacon_location[0])){
        beacons_in_row.push(beacon_location[0])
    }

}

console.log(max_range)

count = 0

for(let i=max_range[0]-1; i<max_range[1]+1;i++){
// for(let i=-5; i<30;i++){
    in_range = false
    for(let j=0; j<cannot_exist_ranges.length;j++){
        if(i >= cannot_exist_ranges[j][0] && i <= cannot_exist_ranges[j][1]){
            in_range = true
            break
        }
    }
    if(in_range){
        count ++
    //     process.stdout.write("#");
    // } else {
    //     process.stdout.write(".");
    }
}
count -= beacons_in_row.length

process.stdout.write("\n");

console.log(count)

