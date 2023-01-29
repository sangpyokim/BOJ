const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const M = +input.shift()
const arr = input.map(Number)
const res = solution(N, M,arr)
console.log(res)
// ----------------------------

function solution(N, M, list) {
  let answer = 0

  const par = Array.from({ length: N+1 }, (_, i) => i)
  const find = x => x === par[x] ? x : par[x] = find(par[x])
  const union = (x, y) => {
    if (x > y) return union(y, x)
    x = find(x)
    y = find(y)
    par[y] = x
  }
  
  for (let x of list) {
    const k = find(x)
    if (k === 0) break;
    answer += 1
    par[k] = k - 1
  }

  return answer
}