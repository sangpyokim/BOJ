let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number)
const l = input.splice(0, N).map(a => a.split(' '))
const m = input


const map = new Map()
for (let [e, p] of l) {
  map.set(e, p)
}
let answer = ''
for (let e of m) {
  answer += map.get(e) + '\n'
}

console.log(answer.trim())