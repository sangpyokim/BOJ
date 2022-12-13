let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');
const [N, M] = input.shift().split(' ')
let answer = ''
const map1 = new Map()
const map2 = new Map()
for (let i = 0; i < N; i++) {
  map1.set(i+1, input[i])
  map2.set(input[i], i+1)
}
for (let i = N; i < (N * 1) + (M * 1); i++) {
  const a = input[i] * 1
  if (map1.has(a)) answer += (map1.get(a))+ '\n'
  else if (map2.has(input[i])) answer += (map2.get(input[i])) + '\n'
}
console.log(answer)