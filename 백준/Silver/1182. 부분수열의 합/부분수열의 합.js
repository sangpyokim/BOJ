const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, T] = input.shift().split(' ').map(Number)
const list = input.shift().split(' ').map(Number)

let answer = 0
helper(0, 0)
if (T === 0) answer -= 1
console.log(answer)

function helper(cur, sum) {
	if (cur === N) { 
		if (sum === T) answer++; 
		return; 
    }
    
	helper(cur + 1, sum);
	helper(cur + 1, sum + list[cur]);
}
