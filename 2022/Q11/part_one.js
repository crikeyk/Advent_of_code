const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

class monkey {
    constructor(){
        this.items = []
        this.true_monkey = null;
        this.false_monkey = null;
        this.test = 0;
        this.num_inspections = 0;
    }
    add_item(item){
        this.items.push(item);
    }
}

let monkeys_list = []
let tmp_items = []

let operator_dict = {
    '+': function (x, y) { return x + y },
    '*': function (x, y) { return x * y }
}

function operation_glob(old, operator, op_2){
    return(operator_dict[operator](old, op_2 == 'old' ? old:parseInt(op_2)))
}

for(let i=0; i<input.length;i++){
    if(input[i].split(' ')[0] == "Monkey"){
        let new_monkey = new monkey();
        tmp_items = input[i+1].match(/(\d+)/g)
        new_monkey.items = tmp_items.map(numStr => parseInt(numStr))

        tmp_items = input[i+2].split(/\s+/)
        new_monkey.operands = [tmp_items[5], tmp_items[6]]
        new_monkey.operation = function (old) {return(operation_glob(old, this.operands[0], this.operands[1]))}

        new_monkey.test = parseInt(input[i+3].split(' ').at(-1));
        new_monkey.true_monkey = parseInt(input[i+4].split(' ').at(-1));
        new_monkey.false_monkey = parseInt(input[i+5].split(' ').at(-1));

        // console.log(new_monkey.items, new_monkey.test, new_monkey.true_monkey, new_monkey.false_monkey);

        monkeys_list.push(new_monkey)
    }
    
    i+=6;
}

// console.log(monkeys_list)


for(let round = 0; round<20; round++){
    for(let monkey_num = 0;monkey_num<monkeys_list.length;monkey_num++){
        let this_monkey = monkeys_list[monkey_num]
        // console.log("monkey = ", monkey_num)

        for(let item_num = 0;item_num<this_monkey.items.length;item_num++){
            this_monkey.num_inspections++
            let item_val = this_monkey.items[item_num]
            // console.log("Item value = ", item_val)
            item_val = this_monkey.operation(item_val)
            item_val = Math.floor(item_val /= 3)
            if(item_val % this_monkey.test == 0){
                monkeys_list[this_monkey.true_monkey].items.push(item_val)
                // console.log("Item value now = ", item_val, " throwing to monkey, ", this_monkey.true_monkey)
            } else {
                monkeys_list[this_monkey.false_monkey].items.push(item_val)
                // console.log("Item value now = ", item_val, " throwing to monkey, ", this_monkey.false_monkey)
            }
            // console.log(item_val)
        }
        this_monkey.items = []
    }    
}

// console.log(monkeys_list)

let monkey_business = []

for(let monkey_num = 0;monkey_num<monkeys_list.length;monkey_num++){
    monkey_business.push(monkeys_list[monkey_num].num_inspections);
}
monkey_business.sort(function (a, b) {  return b - a;  });

console.log("monkey business = ", monkey_business[0] * monkey_business[1])

