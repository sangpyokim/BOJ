const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let list = input.shift().split(' ').map(Number)


const solution = () => {
  const stack = [], stack2 = []
  list.reverse()
  let card = 1

  for (let x of list) {
    if (x === 1) {
      stack.push(card)
    } else if (x === 2) {
      const temp = stack.pop()
      stack.push(card)
      stack.push(temp)
    } else if (x=== 3) {
      stack2.push(card)
    }

    card += 1
  }
  console.log(stack.reverse().concat(stack2).join(' '))
}

solution()

