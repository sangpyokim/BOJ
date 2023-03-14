const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.splice(0, N).map(l => l.split(' ').map(Number))
const list2 = input.splice(0, M).map(l => l.split(' ').map(Number))
// ------------------------------------------------

const 사다리 = new Map()
const 뱀 = new Map()

for (let [x, y] of list) {
  사다리.set(x, y)
}
for (let [x, y] of list2) {
  뱀.set(x, y)
}

let q = [1], time = 0
const visited = new Array(101).fill(false)

while (q.length) {
  const temp = []
  
  for (let x of q) {
    if (x > 100 || visited[x]) continue
    visited[x] = true
    if (x === 100) return console.log(time)

    for (let i = 1; i <= 6; i++) {
      const dx = x + i
      if (사다리.has(dx)) temp.push(사다리.get(dx))
      if (뱀.has(dx)) temp.push(뱀.get(dx))
      else temp.push(dx)
    }


  }
  time += 1
  q = temp
}