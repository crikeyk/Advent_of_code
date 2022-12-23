const {input} = require('./input');

// console.log(input.length)

const dim = 25

image = tunnel = new Array(dim).fill(0).map(() => new Array(dim).fill(0).map(() => new Array(dim).fill(0)));

class Blueprint{
    constructor(line){
        this.number = parseInt(line.match(/Blueprint (\d+):/)[1])
        this.ore_robot_cost = parseInt(line.match(/Each ore robot costs (\d+) ore./)[1])
        this.clay_robot_cost = parseInt(line.match(/Each clay robot costs (\d+) ore./)[1])
        this.obsidian_robot_cost = line.match(/Each obsidian robot costs (\d+) ore and (\d+) clay/).splice(1, 3).map(x => +x)
        this.geode_robot_cost = line.match(/Each geode robot costs (\d+) ore and (\d+) obsidian/).splice(1, 3).map(x => +x)
    }

}

blueprints = []

for(let i=0; i<input.length;i++){
    blueprints.push(new Blueprint(input[i]))
}

class Operation{

    constructor(blueprint){
        this.ore = 0
        this.ore_robots = 1
        this.clay = 0
        this.clay_robots = 0
        this.obsidian = 0
        this.obsidian_robots = 0
        this.geode = 0
        this.geode_robots = 0
        this.blueprint = blueprint
        // this.moves = [
        //     this.build_ore_robot,
        //     this.build_clay_robot,
        //     this.build_obsidian_robot,
        //     this.build_geode_robot
        // ]
    }

    tick(){
        this.ore += this.ore_robots
        this.clay += this.clay_robots
        this.obsidian += this.obsidian_robots
        this.geode += this.geode_robots
    }

    untick(){
        this.ore -= this.ore_robots
        this.clay -= this.clay_robots
        this.obsidian -= this.obsidian_robots
        this.geode -= this.geode_robots
    }

    build_ore_robot(){
        this.ore_robots += 1
        this.ore -= this.blueprint.ore_robot_cost
    }

    unbuild_ore_robot(){
        this.ore_robots -= 1
        this.ore += this.blueprint.ore_robot_cost
    }

    build_clay_robot(){
        this.clay_robots += 1
        this.ore -= this.blueprint.clay_robot_cost
    }

    unbuild_clay_robot(){
        this.clay_robots -= 1
        this.ore += this.blueprint.clay_robot_cost
    }

    build_obsidian_robot(){
        this.obsidian_robots += 1
        this.ore -= this.blueprint.obsidian_robot_cost[0]
        this.clay -= this.blueprint.obsidian_robot_cost[1]
    }
    
    build_geode_robot(){
        this.geode_robots += 1
        this.ore -= this.blueprint.geode_robot_cost[0]
        this.obsidian -= this.blueprint.geode_robot_cost[1]
    }
}

function get_possible_moves(operation){
    moves = [0]
    if(operation.ore >= operation.blueprint.ore_robot_cost){
        moves.push(1)
    }
    if(operation.ore >= operation.blueprint.clay_robot_cost){
        moves.push(2)
    }
    if(operation.ore >= operation.blueprint.obsidian_robot_cost[0] && operation.clay >= operation.blueprint.obsidian_robot_cost[1]){
        moves.push(3)
    }
    if(operation.ore >= operation.blueprint.geode_robot_cost[0] && operation.obsidian >= operation.blueprint.geode_robot_cost[1]){
        moves.push(4)
    }
    return moves
}

function strategy(this_operation){

    if(this_operation.obsidian >= this_operation.blueprint.geode_robot_cost[1]){
        if(this_operation.ore >= this_operation.blueprint.geode_robot_cost[0]){
            return 4
        } else {
            return 0
        }
    }

    // if(this_operation.obsidian + this_operation.obsidian_robots >= this_operation.blueprint.geode_robot_cost[1] &&
    //     this_operation.ore + this_operation.ore_robots >= this_operation.blueprint.geode_robot_cost[0]){
    //     return 0
    // }

    if(this_operation.clay >= this_operation.blueprint.obsidian_robot_cost[1]){
        if(this_operation.ore >= this_operation.blueprint.obsidian_robot_cost[0]){
            return 3
        } else {
            return 0
        }
    }

    // if(this_operation.clay + this_operation.clay_robots >= this_operation.blueprint.obsidian_robot_cost[1] &&
    //     this_operation.ore + this_operation.ore_robots >= this_operation.blueprint.obsidian_robot_cost[0]){
    //     return 0
    // }

    // quick_obs = quickest_obsidian(this_operation, 5)
    // console.log(quick_obs)
    // if(quick_obs[0] < 10){
    //     console.log("here it is ", quick_obs)
    //     return(quick_obs[1])
    // }

    if(this_operation.ore >= this_operation.blueprint.clay_robot_cost){
        return 2
    }
     
    if(this_operation.ore >= this_operation.blueprint.ore_robot_cost){
        return 1
    } else {
        return 0
    }

}

move_names =["Building nothing", "Building ore robot", "Building clay robot", "Building obsidian robot", "Building geode robot"]

function most_geodes(this_operation, time, verbose){

    for(let minute=0; minute<time;minute++){


        if(verbose){
            console.log("Minute:", minute+1)
            // console.log("quickest obsidian ", quickest_obsidian(this_operation, timeout=5))
        }

        move = strategy(this_operation)
                
        switch(move){
            case 1:
                this_operation.build_ore_robot()
                this_operation.ore -= 1
                break
            case 2:
                this_operation.build_clay_robot()
                this_operation.clay -= 1
                break
            case 3:
                this_operation.build_obsidian_robot()
                this_operation.obsidian -= 1
                break
            case 4:
                this_operation.build_geode_robot()
                this_operation.geode -= 1
        }

        this_operation.tick()
        
        if(verbose){
            console.log("Move: ", move_names[move])
            console.log(this_operation)
        }


    }

    // console.log(this_operation)

    return this_operation.geode
}

for(let i=0; i<blueprints.length;i++){
    this_operation = new Operation(blueprints[i])
    geodes = most_geodes(this_operation, 24, verbose = (i==3)?true:false)
    console.log("For blueprint ", blueprints[i].number, " largest geode number is ", geodes)
}

// this_operation = new Operation(blueprints[0])

// this_operation.ore_robots = 1
// this_operation.ore = 3
// this_operation.clay_robots = 3
// this_operation.clay = 12

