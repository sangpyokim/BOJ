let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');
const [N, M] = input.shift().split(' ')
let answer = []
const set = new Set()

for (let i = 0; i < N; i++) {
  set.add(input[i])
}
for (let i = N; i < (N * 1) + (M * 1); i++) {
  if (set.has(input[i])) answer.push(input[i])
}
answer.sort()
console.log(answer.length)
console.log(answer.join('\n'))