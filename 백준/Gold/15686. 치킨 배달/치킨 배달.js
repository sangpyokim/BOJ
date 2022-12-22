let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number)
const matrix = input.map(l => l.split(' ').map(Number))

const h = []
const c = []

for (let i in matrix) {
  for (let j in matrix[i]) {
    if (matrix[i][j] === 1) h.push([i*1, j*1])
    if (matrix[i][j] === 2) c.push([i*1, j*1])
  }
}

// 치킨집의 조합을 구하고 -> 거리를 계산해서 가장 작은 값을 정답.
let res = Infinity
const len = c.length
function helper(L, index, arr) {
  if (L === M) return res = Math.min(res, (getDist(arr)))

  for (let i = index; i < len; i++) {
    helper(L+1, i+1, [...arr, c[i]])
  }
}
helper(0, 0, [])
console.log(res)

function getDist(arr) {
  let sum = 0
  let dist = new Array(h.length).fill(Infinity)


  for (let k in h) {
    const [i, j] = h[k]
    for (let [x, y] of arr) {
      dist[k] = Math.min(dist[k], Math.abs(i - x) + Math.abs(j - y))
    }
    sum += dist[k]
  }
  return sum
}


// console.log(h,c)