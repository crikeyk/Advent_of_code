const {input} = require('./input');

class valve {
    constructor(name){
        this.name = name
        this.flow = 0
        this.connected = []
        this.open_time = 0
    }
}

valves = {}

for(let i=0; i<input.length;i++){
    // console.log(input[i])
    valve_tmp = input[i].match(/Valve ([A-Z]+) has flow rate=(\d+)/).slice(1, 3)
    new_valve = new valve(valve_tmp[0])
    new_valve.flow = parseInt(valve_tmp[1])
    // console.log("valve name = ", valve_tmp[0], " flow rate is ", valve_tmp[1])
    // new_value = new valve()

    input[i].split('; ')[1].match(/([A-Z][A-Z])/g).forEach((element => {
        new_valve.connected.push(element)
        // console.log(element)
    }))

    valves[new_valve.name] = new_valve
}

console.log(valves)

function shortest_path(from, to){
    let queue = []
    
}

start_valve = 'AA'
time_left = 30

// function value_to_open(valve, time){
//     next_values = valves[valve].connected
//     if(time < 0){
//         for(let i=0; i<new_valves.length;i++){
//             value_to_open(next_values[i], time-1)
//         }
//     }
// }

// value_to_open(start_valve, time_left)

console.log(shortest_path('AA', 'AA'))
