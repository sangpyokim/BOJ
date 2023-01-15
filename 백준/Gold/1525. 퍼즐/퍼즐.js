const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const arr = input.map(l => l.split(' ').map(Number))
// ------------------
const dir = [[1,0], [0,1], [-1,0], [0,-1]]
const isVal = (x, y) => x >= 0 && x < 3 && y >= 0 && y < 3

let visited = {};
let min = -1;
let answer = "123456780";

for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (arr[i][j] == 0) {
      bfs();
      break;
    }
  }
}

console.log(min);

function bfs() {
  let start = arrToString(arr);
  visited[start] = 1;
  let q = [start];
  let pt = 0;

  while (pt < q.length) {
    let cur = q[pt++];
    if (cur == answer) {
      min = visited[cur] - 1;
      return;
    }

    let zero = cur.indexOf("0");
    let x = Math.floor(zero / 3);
    let y = zero % 3;

    for (let [a, b] of dir) {
      const nx = x + a
      const ny = y + b
      const np = nx * 3 + ny
      if (isVal(nx, ny)) {
        let next = swap(cur, 3 * x + y, np);
        if (!visited[next]) {
          visited[next] = visited[cur] + 1;
          q.push(next);
        }
      }
    }

  }
}

function arrToString(arr) {
  return arr.map((a) => a.join("")).join("");
}

function swap(str, a, b) {
  let newStr = str.split("");
  [newStr[a], newStr[b]] = [newStr[b], newStr[a]];
  return newStr.join("");
}