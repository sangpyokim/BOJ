const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let TC = +input.shift();
let visited = []
for (let i = 0; i < TC; i++) {
  if (input[i] == 1) {
    console.log(1)
    continue
  }
  solution(input[i])
}

// ------------------------------------------------

function solution(N) {
  visited = []
  let q = [[1, '1']]
  visited[1] = true

  while(q.length) {
    const temp = []

    for (let [x, s] of q) {
      if (x == 0) return console.log(s)

      const nx = []
      const ns = []

      nx[0] = (x * 10) % N;
      ns[0] = s + "0";

      nx[1] = (x * 10 + 1) % N;
      ns[1] = s + "1";

      for (let i = 0; i < 2; i++) {
          if (visited[nx[i]]) continue;
          visited[nx[i]] = true;
          q.push([nx[i], ns[i]]);
      }
    }

    q = temp
  }

  return console.log("BANK")
}




