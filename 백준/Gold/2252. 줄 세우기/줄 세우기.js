const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

const graph = Array.from({ length: N+1 }, () => [])
const degree = Array.from({ length: N+1 }, () => 0)
let q = []
for (let [x, y] of list) {
  graph[x].push(y)
  degree[y] += 1
}

for (let i in degree) {
  if (i == 0) continue
  if (degree[i] === 0) q.push(i * 1)
}

const arr = []
while (q.length) {
  const temp = []

  for (let cur of q) {
    if (degree[cur] === 0) arr.push(cur)

    for (let nextNode of graph[cur]) {
      degree[nextNode] -= 1
      if (degree[nextNode] === 0) {
        temp.push(nextNode)
      }
    }

  }

  q = temp
}

console.log(arr.join(' '))