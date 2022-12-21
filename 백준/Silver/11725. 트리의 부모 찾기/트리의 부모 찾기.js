let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

const graph = []

for (let [x, y] of list) {
  if (!graph[x]) graph[x] = []
  if (!graph[y]) graph[y] = []
  
  graph[x].push(y)
  graph[y].push(x)
}

const child = []

let q = [1]
const set = new Set()

while (q.length) {
  const temp = []

  for (let cur of q) {
    if (set.has(cur)) continue
    set.add(cur)

    const nodes = graph[cur]
    for (let c of nodes) {
      if (!child[c]) child[c] = cur
      temp.push(c)
    }
  }
  q = temp
}
let res = ''
for (let i = 2; i < child.length; i++) {
  res += child[i] + '\n'
}
console.log(res.trim())