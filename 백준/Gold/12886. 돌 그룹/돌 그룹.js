const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// let N = +input.shift()
const list = input.shift().split(' ').map(Number)

let q = [[...list]]
const isVal = (x, y) => x > 0 && y > 0
const visited = new Set()

while (q.length) {
  const temp = []

  for (let [x, y, z] of q) {
    const key = `${x},${y},${z}`
    if (visited.has(key)) continue
    visited.add(key)
    
    if (x === y && y === z) return console.log(1)

    if (isVal(x, y)) {
      const [newX, newY] = XY(x, y)
        temp.push([newX, newY, z])
    }
    if (isVal(x, z)) {
      const [newX, newZ] = XY(x, z)
        temp.push([newX, y, newZ])
    }
    if (isVal(y, z)) {
      const [newY, newZ] = XY(y, z)
        temp.push([x, newY, newZ])
    }

  }
  q = temp
}

function XY(x, y) {
  if (x > y) return [x-y, y+y]

  return [x+x, y-x]
}

console.log(0)