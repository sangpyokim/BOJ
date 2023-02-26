const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let TC = +input.shift()
let answer = ''
for (let i = 0; i < TC; i++) {
  const [V, E] = input.shift().split(' ').map(Number)
  const graph = input.splice(0, E).map(l => l.split(' ').map(Number))
  const res = solution(graph, V, E)
  answer += res + '\n'
}
console.log(answer.trim())

// ------------------------------------------------

function solution(arr, V, E) {
  // console.log("start")
  const graph = {}
  for (let [x, y] of arr) {
    if (!graph[x]) graph[x] = []
    if (!graph[y]) graph[y] = []
    graph[x].push(y)
    graph[y].push(x)
  }

  const colors = new Array(V + 1).fill(-1)
  for (let i = 1; i <= V; i++) {
    if (colors[i] === -1) {
      const res = bfs(i)
      if (res === 'NO') return 'NO'
    }
  }
  function bfs(node) {
    let q = [node]
    colors[node] = 0
    let flag = 1

    while (q.length) {
      const temp = []
      
      for (let cur of q) {
        const nextNodes = graph[cur]
        if (!nextNodes) continue
        
        for (let nextNode of nextNodes) {
          if (colors[nextNode] === 1 - flag) {
            return 'NO'
          }
          if (colors[nextNode] === -1) {
            colors[nextNode] = flag
            temp.push(nextNode)
          }
        }
      }
      
      flag = 1 - flag
      q = temp
    }
  }

  return "YES"
}