let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const N = +input.shift()
const arr = input.map(Number)

  
let maxArea = 0;
const stack = [];
heights = [0].concat(arr).concat([0]);


for (let i = 0; i < heights.length; i++) {
  const cur = heights[i]

  while (stack.length && heights[stack.at(-1)] > cur) {
    const j = stack.pop()
    
    maxArea = Math.max(maxArea, (i -1 - stack.at(-1)) * heights[j])
  }
  
  stack.push(i)
  
  
}

console.log(maxArea)