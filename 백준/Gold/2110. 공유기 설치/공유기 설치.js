const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, C] = input.shift().split(' ').map(Number)
const list = input.map(l => +l)
list.sort((a, b) => a - b)

let left = 1, right = Math.max(...list), answer = 0
while (left <= right) {
  const mid = (right + left) >>> 1 // 최소거리

  const res = isPossible(mid)

  if (res) {
    right  = mid -1
  } else {
    answer = mid
    left = mid + 1
  }
}
console.log(answer)

function isPossible(minDist) {
  let prev = list[0], count = 1
  for (let i = 1; i < N; i++) {
    const cur = list[i]
    if (cur - prev < minDist) continue

    count += 1
    prev = cur
  }
  return count < C
}