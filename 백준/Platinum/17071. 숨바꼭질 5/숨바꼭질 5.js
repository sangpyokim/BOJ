const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, K]= input.shift().split(' ').map(Number)

// ------------------------------------------------

const MAX = 500000;

function bfs(n, k) {
  let q = [n], flag = 0, level = 0
  const arr = Array.from({ length: 2 }, () => new Array(500001).fill(false))
  arr[0][n] = true
  while (q.length) {
    if (k > MAX) break;
    if (arr[flag][k]) return level

    temp = []
    flag = 1 - flag
    for (let cur of q) {
      for (let next of [cur - 1, cur + 1, cur * 2]) {
        if (0 <= next && next <= MAX && !arr[flag][next]) {
          arr[flag][next] = true
          temp.push(next)
        }
      }
    }


    level += 1
    k += level
    q = temp
  }
  return -1
}

const res = bfs(N, K)

console.log(res)