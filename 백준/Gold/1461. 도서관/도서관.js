const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
let list = input.shift().split(' ').map(Number)


const solution = () => {
  let answer = 0
  
  const pos = []
  const neg = []
  for (let x of list) {
    if (x > 0) pos.push(x)
    else neg.push(x)
  }

  pos.sort((a, b) => b - a)
  neg.sort((a, b) => a - b)

  for (let i = 0; i < pos.length; i += M) {
    answer += pos[i] * 2
  }

  for (let i = 0; i < neg.length; i += M) {
    answer += Math.abs(neg[i]) * 2
  }

  answer -= Math.max(Math.abs(neg[0]) || 0, Math.abs(pos[0]) || 0)
  console.log(answer)
}

solution()

