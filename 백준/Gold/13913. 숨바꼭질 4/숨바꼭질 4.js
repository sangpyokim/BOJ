const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [start, end] = input.shift().split(' ').map(Number)
const N = 100001
// ------------------------------------------------
const visited = new Array(N).fill(false)
const isVal = (x) => x >= 0 && x < N
let q = [[start, start + '']], time= 0
while (q.length) {
  const temp = []

  for (let [x, str] of q) {
    if (x == end) {
      console.log(time)
      console.log(str)
      return
    };

    [x - 1, x + 1, x * 2].forEach(num => {
      if (isVal(num) && !visited[num]) {
        visited[num] = true
        temp.push([num, `${str} ${num}`])
      }
    })
  }
  q = temp
  time += 1
}

console.log(time)
