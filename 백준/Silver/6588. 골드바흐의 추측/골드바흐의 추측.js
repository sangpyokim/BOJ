const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

// const N = +input.shift()
const list = input.map(l => +l)

let answer = ''

solution()

console.log(answer.trim())

function solution() {
  const res = prime(1000000)

  for (let x of list) {
    for (let i = 3; i < x; i++) {
      if (res[i] && res[x - i]) {
        answer += `${x} = ${i} + ${x - i}` + '\n'
        break;
      }
        
    }
  }  
}



function prime(n) {
  const arr = [];

  for (let i = 0; i < n + 1; i += 1) {
    arr.push(true);
  }
  
  for (let i = 2; i * i <= n; i += 1) {
    if (arr[i]) {
      for (let j = i * i; j <= n; j += i) {
        arr[j] = false;
      }
    }
  }

  arr.splice(0, 2, false, false);

  return arr
}

// 1 4 8 11