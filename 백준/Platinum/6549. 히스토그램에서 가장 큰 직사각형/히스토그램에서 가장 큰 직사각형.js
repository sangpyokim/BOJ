let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = input.length - 1

for (let i = 0; i < TC; i++) {
  const [N, ...arr] = input[i].split(' ').map(Number)
  
    let maxArea = 0;
    const stack = [];
    heights = [0].concat(arr).concat([0]);
    
    for (let i = 0; i < heights.length; i++) {
        const cur = heights[i]
        while( stack.length && heights[stack[stack.length-1]] > cur ) {
            const j = stack.pop()
            maxArea = Math.max(maxArea, (i - stack[stack.length-1] - 1) * heights[j])
        }
        stack.push(i)
    }
    console.log(maxArea)
}

// 모노토닉 스택문제