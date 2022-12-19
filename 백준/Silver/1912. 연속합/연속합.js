let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()
const list = input[0].split(' ').map(Number)

list.unshift(0)
let res = list[1]
for (let i = 1; i <= N; i++) {
  list[i] = Math.max(list[i], list[i] + list[i - 1])
  res = Math.max(list[i], res)
}

console.log(res)