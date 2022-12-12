let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().split('\n');

// first line
let first = input[0].split(" ").map(Number);
// others line
let numbers = [];

for (let i = 1; i < input.length; i++) {
  if (input[i] !== '') {
    numbers.push(input[i].split(' '));
  }
}
for (let i in numbers) {
  numbers[i] = numbers[i].toString().split('')
}
// -------------------------------------------------------- //
const [row, col] = first
const visited = Array.from({ length: row }, () => new Array(col ).fill(false))
const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
let level = 0
let q = [[0, 0]]

while (q.length) {
  const temp = []
  level += 1

  for (let [i, j] of q) {
    if (i === row -1 && j === col -1) return console.log(level)
    if (visited[i][j]) continue
    visited[i][j] = true
    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      if (dx >= 0 && dx < row && dy >= 0 && dy < col && numbers[dx][dy] == 1) {
        temp.push([dx, dy])
      }
    }
  }

  q = temp
}

console.log(level)
