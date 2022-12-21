let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const str = input.shift()


const fail = "I'm Sorry Hansoo"

const arr = new Array(26).fill(0)

for (let char of str) {
  const i = char.toLocaleLowerCase().charCodeAt(0) - 97
  arr[i] += 1
}
let pal = ''
let odd = 0
for (let i in arr) {
  const x = arr[i]
  if (x % 2 === 1) odd += 1
  
  if (x >= 2) {
    const count = Math.floor(x / 2)
    const char = String.fromCharCode(i * 1 + 97)
    
    pal += char.toUpperCase().repeat(count)
    arr[i] -= count*2
  }
  // console.log(pal)
    
    
  if (odd === 2) return console.log(fail)
}
const reverse = pal.split('').reverse().join('')
odd = 0
for (let i in arr) {
  const x = arr[i]
  if (x % 2 === 1) odd += 1
  const char = String.fromCharCode(i * 1 + 97).toUpperCase()
  if (x > 0) pal += char

  if (odd === 2) return console.log(fail)  
}
console.log(pal + reverse)