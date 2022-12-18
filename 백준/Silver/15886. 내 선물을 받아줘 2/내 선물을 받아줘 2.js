let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const [N, s] = fs.readFileSync(filePath).toString().trim().split("\n");
let res = 0
for (let j = 0; j < N-1; j++) {
  if (s.slice(j, j + 2) === 'EW') res += 1
}
console.log(res)