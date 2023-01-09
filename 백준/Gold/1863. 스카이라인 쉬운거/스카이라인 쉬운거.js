const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

list.unshift([0, 0])
list.push([0,0])


let answer = 0
const stack = []
for (let [x, y] of list) {
  
  const set = new Set()
  while (stack.length && stack.at(-1) > y) {
    const pop = stack.pop()
    set.add(pop)
  }
   answer += set.size
  stack.push(y)

}
console.log(answer)