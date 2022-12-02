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

function get_move(round){
    if (round[2] == 'X'){ //lose
        if (round[0] == 'A'){
            return 'Z';
        } else if (round[0] == 'B'){
            return 'X';
        } else if (round[0] == 'C'){
            return 'Y';
        }
    } else if (round[2] == 'Y'){ // draw
        if (round[0] == 'A'){
            return 'X';
        } else if (round[0] == 'B'){
            return 'Y';
        } else if (round[0] == 'C'){
            return 'Z';
        }
    } else if (round[2] == 'Z'){ // win
        if (round[0] == 'A'){
            return 'Y';
        } else if (round[0] == 'B'){
            return 'Z';
        } else if (round[0] == 'C'){
            return 'X';
        }
    } 
}

let score = 0;
for(let round=0; round<input.length; round++){
    move = get_move(input[round])
    score += calc_score([input[round][0], 0, move]);
}


console.log(score)
