const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split('').map(Number))

const visited = Array.from({ length: N }, () => new Array(2).fill(false))
let q = [[0, 0]] //
time = 0

while (q.length) {
  const temp = []

  for (let [i, d] of q) {
    if (i >= N) return console.log(1)

    if (i < 0 || visited[i][d] || i < time || list[d][i] === 0) continue
    visited[i][d] = true

    temp.push([i+1, d])
    temp.push([i-1, d])
    temp.push([i+M, 1-d])
  }

  time += 1
  q = temp
}
console.log(0)
