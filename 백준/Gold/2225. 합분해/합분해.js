const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number), MOD = 1000000000

const dp = Array.from({length: K+1}, () => new Array(N+1).fill(0))


dp[0][0] = 1

for (let i = 1; i <= K; i++){
    for (let j = 0; j <= N; j++){
        for (let m = 0; m <= j; m++){
            dp[i][j] += dp[i - 1][j - m];
            dp[i][j] %= MOD;
        }
    }
}

console.log(dp[K][N])
