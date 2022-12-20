const {input} = require('./input');
const {localStorage} = require("node-localstorage");

class valve {
    constructor(name){
        this.name = name
        this.flow = 0
        this.connected = []
        this.open_time = 0
    }
}

valves = {}
flow_valves = {}
start_valve = 'AA'

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
    if(new_valve.flow > 0 || new_valve.name == start_valve){
        new_flow_value = new valve(new_valve.name)
        new_flow_value.flow = new_valve.flow
        new_flow_value.connected = {}
        flow_valves[new_valve.name] = new_flow_value
    }
}

// console.log(valves)
// console.log(JSON.stringify(valves))
// localStorage.setItem("userData", JSON.stringify(valves));
// // let valves = localStorage.getItem("userData");
// console.log("stored data")

count = 0

function shortest_path_BFS(from, to){
    // console.log("received ", from, " ", to)
    let queue = []
    let visited = []
    queue.push([from, 0])
    i = 0
    while(queue[i][0] != to){
        // console.log("Visiting ", queue[i])
        visited.push(queue[i][0])
        for(let j=0; j<valves[queue[i][0]].connected.length;j++){
            next_valve = valves[queue[i][0]].connected[j]
            if(next_valve == to){
                return(queue[i][1] + 1)
            }
            if(!visited.includes[next_valve]){
                // console.log("pushing ", new_valve)
                queue.push([next_valve, queue[i][1] + 1])
            }
        }
        i++
    }
    // console.log("length is ", queue.length)
    return(queue[i][1])  
}

// console.log(shortest_path_BFS('AA', 'HM'))

// console.log(flow_valves)

for(var from_key in flow_valves){
    console.log(from_key)
    // flow_valves[i].connected = {}
    for(var to_key in flow_valves){
        flow_valves[from_key].connected[to_key] = shortest_path_BFS(from_key, to_key)
    }
}

// console.log("done")

// console.log(flow_valves)

visited_order = ['AA', 'DD', 'BB', 'JJ', 'HH', 'EE', 'CC']
max_release_total = 0

function get_total_pressure(rt_1, rt_2){
    route_1 = rt_1[0]
    times_1 = rt_1[1]

    route_2 = rt_2[0]
    times_2 = rt_2[1]

    total_pressure = 0

    for(let i=0; i<route_1.length;i++){
        total_pressure += flow_valves[route_1[i]].flow*times_1[i]
    }

    for(let i=0; i<route_2.length;i++){
        total_pressure += flow_valves[route_2[i]].flow*times_2[i]

        for(let j=0; j<route_1.length;j++){
            if(route_1[j] == route_2[i]){
                total_pressure -= flow_valves[route_2[i]].flow*Math.min(times_1[j], times_2[i])
            }
        }
    }

    return(total_pressure)
}

max_release = 0
total_time = 26

// console.log(flow_valves)

let routes = []

function generate_route(route, times){
    // console.log("time left is ", time_left, "trying route ", route)
    next_step = false
    for(var next_valve in flow_valves[route.at(-1)].connected){
        // console.log(next_valve, flow_valves[this_valve].connected[next_valve], times.at(-1))
        if((!route.includes(next_valve)) && flow_valves[route.at(-1)].connected[next_valve] < times.at(-1)){
            times.push(times.at(-1) - (flow_valves[route.at(-1)].connected[next_valve] + 1))
            route.push(next_valve)
            // console.log("sending route ", route)
            generate_route(route, times)
            route.pop()
            times.pop()
            next_step = true
        }
    }

    // if(!next_step && get_total_pressure(route, total_time) > max_release){
    //     max_release = get_total_pressure(route, total_time)
    //     console.log("Max release of ", max_release, " at ", route, " at times ", times.map(x => total_time-x))
    // }

    if(!next_step){
        let new_route = []
        let new_times = []
        for(let i=0; i<route.length-1;i++){
            new_route.push(route[i])
            new_times.push(times[i])
        }
        routes.push([new_route, new_times])
    }
}

generate_route(['AA'], [total_time])

console.log(routes.length)

for(let i=0; i<routes.length-1;i++){
    if(i%100 == 0){
        console.log("Trying route number ", i)
    }
    for(let j=i+1; j<routes.length;j++){
        pressure = get_total_pressure(routes[i], routes[j])
        if(pressure > max_release){
            console.log("new best routes, ", routes[i], routes[j])
            console.log("Max pressure is ", pressure)
        }
        max_release = Math.max(pressure, max_release)
    }
}

// console.log("total pressure is ", get_total_pressure(visited_order, [6]))

// console.log("max_pressure is ", max_release)