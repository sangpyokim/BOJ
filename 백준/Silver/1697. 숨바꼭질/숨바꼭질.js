let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const [N, M] = input.shift().split(' ').map(Number)

let q = [N]
let time = 0
const set = new Set()
while (q.length) {
  const temp = []

  for (let cur of q) {
    if (set.has(cur) || cur < 0 || cur > 100000) continue
    set.add(cur)
    if (cur === M) return console.log(time)

    temp.push(cur + 1)
    temp.push(cur - 1)
    temp.push(cur * 2)
  }

  time++
  q = temp
}