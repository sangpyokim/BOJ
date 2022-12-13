let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');
const N = +input.shift()
const edgeLen = +input.shift()
const edges = input.map(l => l.split(' ').map(Number))

const graph = {}
let count = 0
for (let [x, y] of edges) {
  if (!graph[x]) graph[x] = []
  if (!graph[y]) graph[y] = []
  graph[x].push(y)
  graph[y].push(x)
}

const visited = Array.from({ length: N + 1 }, () => false)
function helper(node) {
  if (visited[node]) return
  visited[node] = true

  for (let nextNode of graph[node]) {
    helper(nextNode)
  }
}
helper(1)

for (let i in visited) {
  if (i == 1) continue
  else if (visited[i]) count += 1
}
console.log(count)