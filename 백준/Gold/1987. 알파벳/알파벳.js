const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [row, col] = input.shift().split(' ').map(Number);
const matrix = input.map((i) => i.split(''));

const visited = new Array(26).fill(false)

let answer = 0
const dir = [[1,0], [0,1], [-1,0], [0,-1]]
const val = (x, y) => x >= 0 && x < row && y >= 0 && y < col
const set = new Set()

function helper(L, i, j) {
  const char = matrix[i][j].charCodeAt(0)-65
  if (visited[char]) return
  
  visited[char] = true
  answer = Math.max(answer, L)


  for (let [x, y] of dir) {
    const dx = i + x 
    const dy = j + y
    if (val(dx, dy)) helper(L + 1, dx, dy)
  }

  visited[char] = false
}

helper(1, 0, 0)

console.log(answer)
