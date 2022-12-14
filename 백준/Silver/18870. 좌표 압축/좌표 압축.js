let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const N = +input.shift()
const nums = input.shift().split(' ').map(Number)
const list = []
for (let i in nums) {
  const num = nums[i]
  list.push([i*1, num])
}

list.sort((a, b) => a[1] - b[1])

const map = new Map()
let j = 0
for (let i in list) {
  const a = list[i]
  if (!map.has(a[1])) {
    map.set(a[1], j)
    j += 1
  }

}

const answer = []

for (let num of nums) {
  answer.push(map.get(num))
}

console.log(answer.join(' ').trim())
