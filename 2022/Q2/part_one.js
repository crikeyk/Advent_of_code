const path = require('path');
const fs = require('fs');

const input = fs
        .readFileSync(path.join(__dirname, "input.txt"), 'utf8')
        .toString()
        .replace(/\r/gm, "")
        .trim()
        .split('\n');
console.log("Input length = " + input.length);


function calc_score(round){
    let round_score = 0;

    // console.log(round[0]);
    // console.log(round[2]);


    if (round[2] == 'X'){ //rock
        if (round[0] == 'A'){
            return 3 + 1;
        } else if (round[0] == 'B'){
            return 0 + 1;
        } else if (round[0] == 'C'){
            return 6 + 1;
        }
    } else if (round[2] == 'Y'){ // paper
        if (round[0] == 'A'){
            return 6 + 2;
        } else if (round[0] == 'B'){
            return 3 + 2;
        } else if (round[0] == 'C'){
            return 0 + 2;
        }
    } else if (round[2] == 'Z'){ // scissors
        if (round[0] == 'A'){
            return 0 + 3;
        } else if (round[0] == 'B'){
            return 6 + 3;
        } else if (round[0] == 'C'){
            return 3 + 3;
        }
    }
        
}


let score = 0;
for(let round=0; round<input.length; round++){
    // console.log(calc_score(input[round]));
    score += calc_score(input[round]);
}


console.log(score)
