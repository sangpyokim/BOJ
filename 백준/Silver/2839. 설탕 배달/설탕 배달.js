const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n"); 
// -------------------------------------------

const solution = () => {
  const N = +input.shift()
  
  const arr = new Array(N+1).fill(Infinity)
  arr[3] = 1
  arr[5] = 1

  for (let i = 6; i <= N+1; i++) {
    arr[i] = Math.min(arr[i - 3] + 1, arr[i - 5] + 1)
  }
  const answer = arr[N] === Infinity ? -1 : arr[N]
  
  console.log(answer)
}

solution()