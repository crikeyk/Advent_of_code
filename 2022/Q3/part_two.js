const {input} = require('./input');

console.log("Input length = " + input.length);

const row_length = input[0].length;

console.log("Row length = " + row_length);

let priority_sum = 0;

function get_unique_item(sack_1, sack_2, sack_3){
    for(let i=0; i<sack_1.length; i++){
        for(let j=0; j<sack_2.length; j++){
            for(let k=0; k<sack_3.length; k++){

                if(sack_1[i] == sack_2[j] && sack_2[j] == sack_3[k]){
                    return(sack_1[i]);
                }
            }
        }
    }
}

function get_priority(letter){
    value = letter.charCodeAt(0);
    if (value > 96){
        return value - 96;
    } else {
        return value - 38;
    }
}

for(let i=0; i<input.length; i++){
    if(i%3 == 2){
        sack_1 = input[i-2];
        sack_2 = input[i-1];
        sack_3 = input[i-0];

        // console.log("------");
        // console.log(sack_1);
        // console.log(sack_2);
        // console.log(sack_3);


        item = get_unique_item(sack_1, sack_2, sack_3);
        priority = get_priority(item);
        // console.log("priority is " + priority);
        priority_sum += priority;

    }

}

console.log("sum = " + priority_sum);

// console.log(get_priority('A'));