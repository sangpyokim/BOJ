const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let str = input.shift()


const solution = () => {
  const map = new Map(), len = str.length
  let answer = 0 

  for (let right = 0, left = 0; right < len; right++) {
    const cur = str[right]
    
    map.set(cur, map.get(cur) + 1 || 1)

    while (map.size > N) {
      const l = str[left]

      const a = map.get(l)
      if (a === 1) map.delete(l)
      else map.set(l, a - 1)

      left += 1
    }

    answer = Math.max(answer, right - left + 1)
  }
  
  console.log(answer)
}



solution()

// 1 4 8 11