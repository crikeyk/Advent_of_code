const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

const num_rows = input.length;
const num_cols = input[0].length;

console.log("num rows = ", num_rows, " num cols = ", num_cols)

function is_visible(input, row, col){

    // if(row == 0 || row == num_rows || col == 0 || col == num_cols){
    //     return true;
    // }

    console.log(input[row][col], " row = ", row, "col = ", col);
    let visible = true;
    let visible_at_all = false;
    let treeHeight = parseInt(input[row][col]);

    for(let x=0; x<col;x++){ // left
        // console.log("x = ", x)
        if(parseInt(input[row][x]) >= treeHeight){
            visible = false;
        }
    }

    if(visible){console.log("seen from left");}
    if(visible){visible_at_all = true;}
    visible = true;

    for(let x=col+1; x<num_cols;x++){ // right
        if(parseInt(input[row][x]) >= treeHeight){
            visible = false;
        }
    }

    if(visible){console.log("seen from right");}
    if(visible){visible_at_all = true;}
    visible = true;

    for(let y=0; y<row;y++){ // up
        // console.log("y = ", y)
        if(parseInt(input[y][col]) >= treeHeight){
            visible = false;
        }
    }

    if(visible){console.log("seen from up");}
    if(visible){visible_at_all = true;}
    visible = true;

    for(let y=row+1; y<num_rows;y++){ // down
        if(parseInt(input[y][col]) >= treeHeight){
            visible = false;
        }
    }

    if(visible){console.log("seen from down");}
    if(visible){visible_at_all = true;}
    visible = true;

    return visible_at_all;
}

let num_visible = 0;

for(let row=0; row<num_rows;row++){
    for(let col=0; col<num_cols;col++){
        if(is_visible(input, row, col)){
            num_visible += 1;
        }
    }
}

console.log("Num visible = ", num_visible);