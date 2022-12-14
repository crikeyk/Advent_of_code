const { constants } = require('buffer');
const { isNumberObject } = require('util/types');
const {input} = require('./input');

input_length = input.length

console.log("Input length = " + input_length);

function find_close(paren_string, index){
    let count = 0
    for(let i=index; i<paren_string.length;i++){
        if(paren_string[i] == ']'){
            count -= 1;
            if(count == 0){
                return i
            }
        } else if (paren_string[i] == '['){
            count += 1
        }
    }
}

function parse_packet(packet_string){
    // console.log("parsing packet ", packet_string)
    let packet = []
    let i = 1;
    let next_dig = 0;
    let isDigit = false;
    while(i<packet_string.length-1){
        // console.log("next digit is ", packet_string[i])
        if(packet_string[i] == '['){
            let close_paren = find_close(packet_string, i)
            packet.push(parse_packet(packet_string.slice(i, find_close(packet_string, i)+1)))
            i = close_paren
        } else if(packet_string[i] == ','){
            if(isDigit){
                packet.push(next_dig)
                next_dig = 0;
                isDigit = false;
            }
        } else {
            isDigit = true;
            next_dig *= 10
            next_dig += parseInt(packet_string[i])
        }
        i++;
    }

    if(isDigit){packet.push(next_dig)}

    // console.log("returning ", packet)

    return packet
}

function to_array(input){
    if( typeof input == 'number'){
        return [input]
    } else {
        return input
    }
}

function are_packets_in_order(left, right){
    // console.log("comparing ", left, " and ", right)
    let left_len = left.length
    let right_len = right.length
    for(let i=0; i<Math.min(left_len, right_len);i++){
        if(typeof left[i] == "number" && typeof right[i] == "number"){
            // console.log("comparing ", left[i], " and ", right[i])
            if(left[i] < right[i]){
                return true
            } else if (left[i] > right[i]){
                return false
            }
        } else {
            ret_val = are_packets_in_order(to_array(left[i]), to_array(right[i]))
            if(ret_val != -1){
                return(ret_val)
            }
        }

    }

    if(left_len < right_len){
        return true
    } else if(left_len > right_len){
        return false
    } else {
        return -1
    }
}

let div_packet_1 = 0
let div_packet_2 = 0

for(let i=0; i<input.length;i++){
    let packet = parse_packet(input[i])

    if(input[i] != "" && are_packets_in_order(packet, [[2]])){
        div_packet_1 ++
    }

    if(input[i] != "" && are_packets_in_order(packet, [[6]])){
        div_packet_2 ++
    }
}


if(div_packet_1 < div_packet_2){
    div_packet_1 += 1
    div_packet_2 += 2
} else {
    div_packet_1 += 2
    div_packet_2 += 1
}

console.log(div_packet_1, div_packet_2, div_packet_1*div_packet_2)