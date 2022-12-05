const {input} = require('./input');

console.log("Input length = " + input.length);

const row_length = input[0].length;

let num_fully_contained = 0;

function is_fully_contained(sections){
    // console.log(typeof(sections));

    sections_split = sections.split(',');
    let section_1 = sections_split[0].split('-');
    let section_2 = sections_split[1].split('-');
    console.log(sections_split);

    
    console.log(parseInt(section_1[0]));


    if((parseInt(section_1[0]) <= parseInt(section_2[0]) &&
    parseInt(section_1[1]) >= parseInt(section_2[1])) ||
    (parseInt(section_1[0]) >= parseInt(section_2[0]) &&
    parseInt(section_1[1]) <= parseInt(section_2[1]))){
        return true
    } else {
        return false
    }
}

for(let i=0; i<input.length; i++){
    if(is_fully_contained(input[i])){
        num_fully_contained += 1;
    }

}

console.log("num = " + num_fully_contained);
