const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift()
let answer = ''
for (let i = 0; i < TC; i++) {
  const L = +input.shift()
  const [startX, startY] = input.shift().split(' ').map(Number)
  const [endX, endY] = input.shift().split(' ').map(Number)
  const res = solution(L, startX, startY, endX, endY)
  answer += res + '\n'
}
console.log(answer.trim())
// ----------------------------
function solution(L, sx, sy, ex, ey) {
  const dir = [[1, -2], [2, -1], [2, 1], [1, 2], [-1, 2], [-2, 1], [-1, -2], [-2, -1]]
  const isVal = (x, y) => x >= 0 && x < L && y >= 0 && y < L

  const dp = Array.from({ length: L }, () => new Array(L).fill(Infinity))

  let q = [[sx, sy, 0]]
  while (q.length) {
    const temp = []

    for (let [i, j, t] of q) {
      if (t >= dp[i][j]) continue
      dp[i][j] = t

      if (i === ex && j === ey) {
        return t
      }

      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy)) {
          temp.push([dx,dy,t+1])
        }
      }

    }

    q = temp
  }

}
