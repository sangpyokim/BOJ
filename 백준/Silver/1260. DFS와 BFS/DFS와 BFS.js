let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');

let [node, edge, startNode] = input[0].split(" ").map(Number);
let numbers = [];

for (let i = 1; i < input.length; i++) {
  if (input[i] !== '') {
    numbers.push(input[i].split(' '));
  }
}
// count
// 정점 개수, 간선 개수, 시작노드
const graph = Array.from({ length: node +1 }, () => [])
for (let [x, y] of numbers) {
  x = Number(x)
  y = Number(y)
  graph[x].push(y)
  graph[y].push(x)
}
for (let x of graph) {
  x.sort((a,b) => a-b)
}
console.log(dfs().join(' '))
console.log(bfs().join(' '))


function bfs() {
  const res = []
  const visited = Array.from({ length: node +1 }, () => false)
  let q = [startNode]
  while (q.length) {
    const temp = []
    for (let cur of q) {
      if (visited[cur]) continue
      visited[cur] = true

      res.push(cur)

      const nextNodes = graph[cur]
      for (let nextNode of nextNodes) {
        temp.push(nextNode)
      }
    }
    q = temp
  }
  return res
}


function dfs() {
  const res = []
  const visited = Array.from({ length: node + 1 }, () => false)
  
  function helper(node) {
    if (visited[node]) return 
    visited[node] = true

    res.push(node)

    const nextNodes = graph[node]
    for (let nextNode of nextNodes) {
      helper(nextNode)
    }
  }

  helper(startNode)

  return res
}