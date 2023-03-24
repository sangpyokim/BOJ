const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.splice(0, N).map(l => l.split('').map(Number))
const target = input.map(l => l.split('').map(Number))


let count = 0
for (let i = 0; i < N - 2; i++) {
  for (let j = 0; j < M - 2; j++) {
    if (!비교(list[i][j], target[i][j])) {
      count += 1
      뒤집기(i, j)
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M ; j++) {
    if (!비교(list[i][j], target[i][j])) return console.log(-1)
  }
}

console.log(count)

function 뒤집기(i, j) {
  for (let x = i; x < i + 3; x++) {
    for (let y = j; y < j + 3; y++) {
      list[x][y] = 1 - list[x][y]
    }
  }
}
function 비교(item1, item2) {
  return item1 === item2
}