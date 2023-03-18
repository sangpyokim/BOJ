const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, L] = input.shift().split(' ').map(Number)
let list = []
if (N !== 0) list = input.shift().split(' ').map(Number)
list.push(L)
list.sort((a, b) => a - b)

let left = 0, right = L

while (left < right) {
  const mid = (right + left) >>> 1
  
  let prev = 0, count = 0
  for (let dist of list) {
    const interval = dist - prev
    const x = Math.ceil(interval / mid) -1

    count += x
    prev = dist
  }
  
  if (count <= M) {
    right = mid
  } else {
    left = mid+1
  }
}

console.log(left)