const {input} = require('./input')

let X = 0;
let depth = 0;
let match_str = '';
let dir = '';
let amt = 0;

let re = /(\w+)\s(\d+)/;

console.log("Input length = " +input.length)

for(let i=0; i<input.length; i++){
    match_str = input[i].match(re);
    dir = match_str[1];
    amt = parseInt(match_str[2]);

    console.log(input[i]);
    
    switch(dir){
        case "forward":
            X += amt;
            break;
        case "up":
            depth -= amt;
            break;
        case "down":
            depth += amt;
            break
        default:
            console.log("couldnt parse " + match);
    }


}

console.log("X = " + X, " depth = " + depth, " product = " + X*depth);