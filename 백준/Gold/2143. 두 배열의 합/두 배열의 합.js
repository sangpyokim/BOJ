const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const T = input[0]
const len1 = input[1]
const arr1 = input[2].split(' ').map(Number)
const len2 = input[3]
const arr2 = input[4].split(' ').map(Number)

// T를 찾기.
// 1. arr1누적합, arr2 누적합
// 2. arr1 순회하면서 부족한 값 arr2에서 가져오기
function prefix(A, L) {
  const arr = []
  for (let i = 0; i < L; i++) {
    let sum = A[i]
    arr.push(sum)
    for (let j = i + 1; j < L; j++) {
      sum += A[j]
      arr.push(sum)
    }
  }
  return arr
}
const prefixArr1 = prefix(arr1, len1)
const prefixArr2 = prefix(arr2, len2)
const map = new Map()
for (let x of prefixArr2) {
  map.set(x, map.get(x) + 1 || 1)
}

let answer = 0
for (let item of prefixArr1) {
  const diff = T - item
  const a = map.get(diff) || 0
  answer += a
}
console.log(answer)
