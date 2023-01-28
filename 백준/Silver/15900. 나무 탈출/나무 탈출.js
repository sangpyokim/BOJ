const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))
// ----------------------------
// 각 리프노드의 레벨 수를 더해서 홀수면 이김.
const graph = Array.from({ length: N + 1 }, () => new Array())
const visited = new Array(N + 1).fill(0)

for (let [x, y] of list) {
  graph[x].push(y)
  graph[y].push(x)
}

let count = 0
visited[1] = true
dfs(0, 1)
console.log(count % 2 === 1 ? "Yes" : "No")

function dfs(L, cur) {
  if (cur !== 1 && graph[cur].length === 1) { // 리프노드일때
    if (L % 2=== 1) count++ // 레벨을 더해줌
    return
  }
  
  visited[cur] = 1

  const nextNodes = graph[cur]
  for (let nextNode of nextNodes) {
    if (!visited[nextNode]) {
      dfs(L + 1, nextNode)
    }
  }
}