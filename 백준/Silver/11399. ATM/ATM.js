let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');

// first line
let first = input[0].split(" ").map(Number);
// others line
let numbers = [];

for (let i = 1; i < input.length; i++) {
  if (input[i] !== '') {
    numbers.push(input[i].split(' ').map(Number));
  }
}

let prev = 0
let res = 0
numbers[0].sort((a, b) => a - b)
for (let num of numbers[0]) {
  prev += num
  res += prev
}
console.log(res)