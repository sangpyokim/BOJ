const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, R] = input.shift().split(' ').map(Number)
let list = input.map(l => l.split(' ').map(Number))

// ----------------------------------------------------
const min = Math.min(N >>> 1, M >>> 1)

for (let i = 0; i < R; i++) {
  const res = rotate(list)
  list = res
}
let answer = ''
for (let x of list) {
  answer += x.join(' ') + '\n'
  
}
console.log(answer.trim())

function rotate(arr) {  // 90000 000
  let min = Math.min(N, M)

  // 나눗셈으로 밀기.
  // 각 모서리 시작점은 다른애가 채워줌.
  let temp = new Array(N).fill(null).map(_ => new Array(M).fill(0));
  for (let limit = 0; limit < Math.floor(min / 2); limit++) {

    // 윗줄.
    for (let j = (M - 2) - limit; j >= 0 + limit; j--) {
      temp[0 + limit][j] = arr[0 + limit][j + 1];
    }
    // 왼쪽.
    for (let j = 1 + limit; j < N - limit; j++) {
      temp[j][0 + limit] = arr[j - 1][0 + limit];
    }
    // 아래
    for (let j = 1 + limit; j < M - limit; j++) {
      temp[(N - 1) - limit][j] = arr[(N - 1) - limit][j - 1];
    }
    // 오른쪽.
    for (let j = (N - 2) - limit; j >= 0 + limit; j--) {
      temp[j][(M - 1) - limit] = arr[j + 1][(M - 1) - limit];
    }

  }

  return temp;
}