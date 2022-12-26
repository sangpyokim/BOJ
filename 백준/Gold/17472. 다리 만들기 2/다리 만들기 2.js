const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [row, col] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

// 유니온 파인드

// dfs
let visited = Array.from({ length: row }, () => new Array(col).fill(false))
const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const val = (x, y) => x >= 0 && x < row && y >= 0 && y < col
// nodes
const nodes = []
const edges = []
let count = 1
for (let i in list) {
  for (let j in list[i]) {
    if (!visited[i][j] && list[i][j] === 1) {
      nodes[count] = []
      dfs(i*1, j*1, count)
      count += 1
    }
  }
} 

visited = Array.from({ length: row }, () => new Array(col).fill(false))

for (let k in nodes) {
  for (let [i, j] of nodes[k]) {
    for (let x of dir) {
      dfs2(0, i, j, x, k*1)
    }
  }
}
let cost = 0
edges.sort((a, b) => a[2] - b[2])


const par = Array.from({ length: count }, (_, i) => i)
const find = x => x === par[x] ? x : par[x] = find(par[x])
const union = (x, y) => {
  if (x > y) return union(y, x)
  x = find(x)
  y = find(y)

  par[y] = x
}

for (let [x, y, w] of edges) {
  if (find(x) !== find(y)) {
    union(x, y)
    cost += w
  }
}
let set = new Set()
for (let i = 1; i <= count; i++) {
  if (par[i]) set.add(find(i))
}

console.log(set.size !== 1 ? -1 : cost)

function dfs2(L, i, j, d, t) {
  if (list[i][j] !== t && list[i][j] > 0) {
    if (L-1 > 1) {
      return edges.push([t, list[i][j], L-1])
    }
    return
  }
  if (visited[i][j]) return
  visited[i][j] = true
  const nx = i + d[0]
  const ny = j + d[1]
  if (val(nx, ny) && list[nx][ny] !== t) dfs2(L + 1, nx, ny, d, t)
  visited[i][j] = false
} 


function dfs(i, j, k) {
  if (visited[i][j]) return 
  visited[i][j] = true
  list[i][j] = k
  nodes[k].push([i, j])

  for (let [x, y] of dir) {
    const dx = i + x
    const dy = j + y
    if (val(dx, dy) && list[dx][dy] === 1) dfs(dx, dy, k)
  }
}
