const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().split("\n");

const text = input.shift()
const pattern = input.shift()
// ------------------------------------------------

const len = pattern.length
const table = new Array(len).fill(0)

let j = 0, count = 0
for (let i = 1; i < len; i++) {
  while (j > 0 && pattern[i] !== pattern[j]) {
    j = table[j-1]
  }
  if (pattern[i] === pattern[j]) {
    table[i] = ++j
  }
}

j = 0
const arr = []
for (let i = 0; i < text.length; i++){
  while (j > 0 && text[i] !== pattern[j]) {
    j = table[j - 1];
  }
  
  if (text[i] == pattern[j]) {      
    if (j === len - 1) {
      arr.push(i - len + 2);
      count++;
      j = table[j];
    }
    else {
      j++;
    }
  }
}

let answer = ''
answer += count + '\n'
for (let x of arr) {
  answer += x + '\n'
}
console.log(answer.trim())