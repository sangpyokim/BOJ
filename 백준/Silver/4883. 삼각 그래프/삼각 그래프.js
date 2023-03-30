const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let answer = '', k = 1

while (true) {
    const N = +input.shift()
    if (N === 0) break;
    const list = input.splice(0, N).map(l => l.split(' ').map(Number))

    const n = solution(N, list)

    answer += `${k}. ${n}` + '\n'

    k += 1
}

function solution(N, list) {
    const len = list.length
    const dp = Array.from({ length: len+1 }, () => new Array(3).fill(0))
    let first = list[0][1]

    dp[0] = [first, first, Math.min(first, first + list[0][2])]
    
    for (let i = 1; i < len; i++) {
        const [one, two, three] = list[i]
        dp[i][0] = one + Math.min(dp[i - 1][0], dp[i - 1][1])
        dp[i][1] = two + Math.min(dp[i][0], dp[i - 1][0], dp[i - 1][1], dp[i - 1][2])
        dp[i][2] = three + Math.min(dp[i][1], dp[i-1][1], dp[i-1][2])
    }



    return dp[N - 1][1]
}

console.log(answer.trim())

