let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const TC = +input.shift();

let data = input[0].split(' ').map(Number);

// ---------------------------------------------------------- //

data.sort((a, b) => a - b)
const len = data.length
let left = 0, right = len-1
let res = Math.abs(data[left] + data[right])
let answer = [data[left], data[right]]

while (left < right) {
  const sum = data[left] + data[right]
  const abs = Math.abs(data[left] + data[right])

  if (sum === 0) return console.log(`${data[left]} ${data[right]}`)
  else if (res > abs) {
    res = abs
    answer = [data[left], data[right]]
  }

  if (sum < 0) {
    left += 1
  } else {
    right -= 1
  }
}

console.log(answer.join(' '))

