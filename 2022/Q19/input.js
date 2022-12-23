const path = require('path');
const fs = require('fs');

const input = fs
        .readFileSync(path.join(__dirname, "input_test.txt"), 'utf8')
        .toString()
        .replace(/\r/gm, "")
        // .trim()
        .split('\n');


module.exports = {input};