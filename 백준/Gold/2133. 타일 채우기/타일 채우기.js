const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
// const list = input.shift().split(' ').map(Number)


const solution = () => {
    if (N % 2 === 1) return console.log(0)

    const dp = new Array(N).fill(0)
    dp[0] = 1
    dp[1] = 3
    const max = N >>> 1
    for (let i = 2; i <= max; i++) {
        dp[i] = (dp[i - 1] * 4) - (dp[i - 2])
    }
    console.log(dp[max])
}
solution()