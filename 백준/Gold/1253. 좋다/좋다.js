const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.shift().split(' ').map(Number)

list.sort((a, b) => a - b)

const map = new Map()
for (let i = 0; i < N; i++) {
  map.set(list[i], map.get(list[i]) + 1 || 1)
}
const m = new Set()
let answer = 0

for (let i = 0; i < N; i++) {
  const count1 = map.get(list[i])

  for (let j = 0; j < N; j++) {
    if (i === j) continue
    const count2 = map.get(list[j])
    if (list[i] === 0 && count2 === 1) continue
    if (list[j] === 0 && count1 === 1) continue
    // 둘다 0 인데 개수가2개면 넘어가기
    if (list[i] === 0 && list[j] === 0 && map.get(0) <= 2 ) continue


    const sum = list[i] + list[j]
    m.add(sum)
  }
}

for (let i = 0; i < N; i++) {
  const num = list[i]
  if (m.has(num)) answer += 1
}
console.log(answer)
