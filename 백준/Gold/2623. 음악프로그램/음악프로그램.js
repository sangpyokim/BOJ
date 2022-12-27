const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

// solution
const graph = Array.from({ length: N + 1 }, () => [])
const degree = Array.from({ length: N + 1 }, () => 0)

for (let arr of list) {
  for (let i = 1; i < arr.length - 1; i++) {
    const cur = arr[i]
    const next = arr[i+1]
    graph[cur].push(next)
    degree[next] += 1
  }
}

const res = khan(graph, degree)

if (res.length !== N) return console.log(0)

let answer = ''
for (let char of res) {
  answer += char + '\n'
}
console.log(answer.trim())




function khan(graph, degree) {
  let q = []
  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) q.push(i)
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
  return arr
}