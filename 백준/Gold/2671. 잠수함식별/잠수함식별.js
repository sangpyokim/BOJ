const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const str = input.shift(), reg = /^(100+1+|01)+$/
const res = str.match(reg)

if (res) console.log('SUBMARINE')
else console.log('NOISE')
