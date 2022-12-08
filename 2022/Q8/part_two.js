const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

const num_rows = input.length;
const num_cols = input[0].length;

console.log("num rows = ", num_rows, " num cols = ", num_cols)

function get_scenic_score(input, row, col){

    // if(row == 0 || row == num_rows || col == 0 || col == num_cols){
    //     return true;
    // }

    let scenic_score = 1;

    console.log(input[row][col], " row = ", row, "col = ", col);
    let score = 0;
    let treeHeight = parseInt(input[row][col]);

    for(let x=0; x<col;x++){ // left
        // console.log("x = ", x)
        if(parseInt(input[row][x]) >= treeHeight){
            score = col-x;
        }
    }
    if(score == 0){score = col;}

    console.log(score);

    scenic_score *= score;
    score = 0;

    for(let x=col+1; x<num_cols;x++){ // right
        if(parseInt(input[row][x]) >= treeHeight){
            score = x-col;
            break;
        }
    }
    if(score == 0){score = num_cols - col-1;}


    console.log(score);

    scenic_score *= score;
    score = 0;

    for(let y=0; y<row;y++){ // up
        // console.log("y = ", y)
        if(parseInt(input[y][col]) >= treeHeight){
            score = row -y;
        }
    }
    if(score == 0){score = row;}


    console.log(score);

    scenic_score *= score;
    score = 0;

    for(let y=row+1; y<num_rows;y++){ // down
        if(parseInt(input[y][col]) >= treeHeight){
            score = y - row;
            break
        }
    }
    if(score == 0){score = num_rows - row-1;}


    console.log(score);

    scenic_score *= score;

    console.log("scenic score is ", scenic_score);

    return scenic_score;
}

let max_score = 0;
let score = 0

for(let row=1; row<num_rows-1;row++){
    for(let col=1; col<num_cols-1;col++){
        score = get_scenic_score(input, row, col)
        if(score > max_score){
            max_score = score;
        }
    }
}

console.log("Max score = ", max_score);