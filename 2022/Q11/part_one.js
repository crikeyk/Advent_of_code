const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

class monkey {
    constructor(){
        this.items = []
        this.true_monkey = null;
        this.false_monkey = null;
        this.test = 0;
    }
    add_item(item){
        this.items.push(item);
    }
}

monkeys_list = []
let monkey_num = 0;

for(let i=0; i<input.length;i++){
    if(input[i].split(' ')[0] == "Monkey"){
        let new_monkey = new monkey();
        let tmp_items = input[i+1].split(':').at(-1)
        let tmp_items_array = tmp_items.split(' ')
        for(let j=0; j<tmp_items_array.length;j++){
            console.log(tmp_items_array[i])
            this.items.push(parseInt(tmp_items_array[i].replace(',', '')))
        }
        new_monkey.test = parseInt(input[i+3].split(' ').at(-1));
        new_monkey.true_monkey = parseInt(input[i+4].split(' ').at(-1));
        new_monkey.false_monkey = parseInt(input[i+5].split(' ').at(-1));

        console.log(new_monkey.items, new_monkey.test, new_monkey.true_monkey, new_monkey.false_monkey);

        monkeys_list.push(new_monkey)

    }
    
    i+=6;
}