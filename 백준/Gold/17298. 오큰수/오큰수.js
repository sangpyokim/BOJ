const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.shift().split(' ').map(Number)


const solution = () => {
    const answer = new Array(N).fill(-1), stack = []

    for (let i = 0; i < N; i++) {
        const item = list[i]

        while (stack.length && list[stack[stack.length-1]] < item ) {
            const index = stack.pop()
            answer[index] = item
        }

        stack.push(i)
    }
    console.log(answer.join(' '))

}
solution()