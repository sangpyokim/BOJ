const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input.shift();
const list = input.map(l => l.split(' ').map(Number));

// ------------------------------------------------

const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N
let MaxNumber = 0
list.forEach(arr => arr.forEach(num => MaxNumber = Math.max(num, MaxNumber)
))

let left = 0, right = MaxNumber;
while (left < right) {
  const mid = (right + left) >>> 1

  const res = slidingWindow(mid)
  if (res) {
    right = mid
  } else {
    left = mid+1
  }
}

console.log(left)

function slidingWindow(mid) { 
  for (let l = 0, r = mid; r <= MaxNumber; r++, l++) {
    if (l <= list[0][0] && list[0][0] <= r) {
      const res = bfs(l, r)
      if (res) return true
    }
  }
  return false
}


function bfs(left, right) {
  let q = [[0, 0]]
  const visited = Array.from({ length: N }, () => new Array(N).fill(false))
  
  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      if (i === N - 1 && j === N - 1) return true

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && !visited[dx][dy] && left <= list[dx][dy] && list[dx][dy] <= right) {
          visited[dx][dy] = true
          temp.push([dx, dy])
        }
      }
    }
    
    q = temp
  }
  return false
} 