const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift()
let a = ''
for (let i = 0; i < TC; i++) {
  const N = +input.shift()
  const arr = []
  for (let j = 0; j < N; j++) {
    arr.push(input.shift().split(' '))
  }
  const res = solution(N, arr)
  a += res
}
console.log(a.trim())
// ----------------------------

function solution(N, list) {
  let answer = ''
  const map = new Map()

  for (let [x, y] of list) {
    if (!map.has(x)) map.set(x, map.size)
    if (!map.has(y)) map.set(y, map.size)

  }

  const size = Array.from({ length: 200002 }, (_, i) => 1)
  const par = Array.from({ length: 200002 }, (_, i) => i)
  const find = x => x === par[x] ? x : par[x] = find(par[x])
  const union = (x, y) => {
    if (x > y) return union(y, x)
    x = find(x)
    y = find(y)
    par[y] = x

    size[x] += size[y]
  }
  
  for (let [x, y] of list) {
    const a = map.get(x)
    const b = map.get(y)
    const c = find(a)
    const d = find(b)
    
    if (c !== d) {
      union(a, b)
    }

    answer += String(Math.max(size[find(c)], size[find(d)])) + '\n'
  }

  return answer
}