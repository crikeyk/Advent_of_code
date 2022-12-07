const { constants } = require('buffer');
const {input} = require('./input');

console.log("Input length = " + input.length);

class directory {
    constructor(path){
        this.files = {};
        this.children = [];
        this.path = path;
        this.size = -1;
    }

    add_child(child){
        this.children.push(child);
    }

    add_file(name, size){
        this.files[name] = size;
    }

    get_size(dir_dict){
        if(this.size < 0){
            this.size = 0;
            let i = 0;
            for (var key in this.files){
                this.size += this.files[key];
            }

            for(i=0;i<this.children.length;i++){
                this.size += dir_dict[this.children[i]].get_size(dir_dict);
            }
        }
        return this.size;
    }

}

let dir_dict = {};

dir_dict['/'] = new directory('/');

let current_dir = '/'
let child_obj = []
let i=0;

while(i<input.length){
    // console.log(input[i]);
    let command = input[i].split(' ');
    if(command[1] == 'cd'){
        if(command[2] == '..'){
            current_dir = current_dir.substr(0, current_dir.lastIndexOf("_"));
        } else if(command[2] == '/'){
            current_dir = '/';
        } else {
            current_dir = current_dir + '_' + command[2];

        }
        // console.log("change dir to ", current_dir);
        i++;

    } else if (command[1] == 'ls'){
        i++;
        while(input[i][0] != '$' && input[i][0] != ' '){
            // console.log("adding child", input[i], " to ", current_dir);
            child_obj = input[i].split(' ');
            if(child_obj[0] == 'dir'){ // sub dir
                if(!((current_dir + '_' + child_obj[1]) in dir_dict)){
                    dir_dict[current_dir + '_' + child_obj[1]] = new directory(current_dir + '_' + child_obj[1]);
                    dir_dict[current_dir].add_child(current_dir + '_' + child_obj[1]);
                }
            } else {   // file
                dir_dict[current_dir].add_file(child_obj[1], parseInt(child_obj[0]));
            }
            i++;
        }
    } else {
        console.log(input[i])
            i++;
    }
}

let total_size = 0;
let dir_size = 0;

let smallest_size = 99999999;


let size_free = 70000000 - dir_dict['/'].get_size(dir_dict);

let size_required = 30000000 - size_free;

console.log("size required ", size_required);

for (var key in dir_dict){
    dir_size = dir_dict[key].get_size(dir_dict);

    if(dir_size >= size_required && dir_size < smallest_size){
        smallest_size = dir_size;
    }
}

console.log(smallest_size);
