const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const len = input.length
let arr = []
for (let i = 0; i < len; i++) {
  const first = input[i].split(' ').map(Number)
  if (first.length === 2) {
    if (first[0] === 0 && first[1] === 1) {
      return
    }
    if (arr.length > 0) kru(arr)
    arr = []
  } 
  arr.push(first)
}

function kru(list) {
  // 유니온 파인드
  const [row, col] = list.shift()
  const par = Array.from({ length: row }, (_, i) => i)
  const find = x => x === par[x] ? x : par[x] = find(par[x])
  const union = (x, y) => {
    if (x > y) return union(y, x)
    x = find(x)
    y = find(y)
    
    par[y] = x
  }
  list.sort((a,b) => a[2] - b[2])
  let sum = 0
  let cost = 0
  for (let [x, y, w] of list) {
    if (find(x) !== find(y)) {
      union(x, y)
      cost += w
    }
    sum += w
  }

  console.log(sum - cost)
}
