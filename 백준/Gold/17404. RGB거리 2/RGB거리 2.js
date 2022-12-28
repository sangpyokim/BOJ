const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputData = fs.readFileSync(filePath).toString().trim().split("\n");
let N = +inputData.shift();
let firHous = inputData[0].trim().split(' ');
let noc = [
    {value: firHous[0]*1, ind1: 1, ind2: 2, rgb: 0},
    {value: firHous[1]*1, ind1: 0, ind2: 2, rgb: 1},
    {value: firHous[2]*1, ind1: 0, ind2: 1, rgb: 2},
];
let min_arr = [];
let dp = new Array(N+1);
for(let i=1; i<=N; i++) {
    i===N ? dp[i] = new Array(2) : dp[i] = new Array(3);
    if(i===N) {
        dp[i] = new Array(2);
    } else {
        dp[i] = new Array(3);
    }
}

for(let k=0; k<3; k++) {
    let fh = noc[k].value;
    let ind1 = noc[k].ind1;
    let ind2 = noc[k].ind2;
    let fRgb = noc[k].rgb;
    for(let i=2; i<=N; i++) {
        let input = inputData[i-1].split(' ').map(x=>x*1);
        if(i===2) {
            dp[i].fill(10000);
            dp[i][ind1] = fh + input[ind1];
            dp[i][ind2] = fh + input[ind2];
        } else if(i===N) {
            if(fRgb === 0) {
                dp[i][0] = Math.min(dp[i-1][0] + input[1], dp[i-1][2] + input[1]);
                dp[i][1] = Math.min(dp[i-1][0] + input[2], dp[i-1][1] + input[2]);
            } else if(fRgb === 1) {
                dp[i][0] = Math.min(dp[i-1][1] + input[0], dp[i-1][2] + input[0]);
                dp[i][1] = Math.min(dp[i-1][0] + input[2], dp[i-1][1] + input[2]);
            } else if(fRgb === 2) {
                dp[i][0] = Math.min(dp[i-1][1] + input[0], dp[i-1][2] + input[0]);
                dp[i][1] = Math.min(dp[i-1][0] + input[1], dp[i-1][2] + input[1]);
            }
        } else {
            dp[i][0] = Math.min(dp[i-1][1] + input[0], dp[i-1][2] + input[0]);
            dp[i][1] = Math.min(dp[i-1][0] + input[1], dp[i-1][2] + input[1]);
            dp[i][2] = Math.min(dp[i-1][0] + input[2], dp[i-1][1] + input[2]);
        }
    }
    min_arr.push(Math.min(...dp[N]));
}
console.log(Math.min(...min_arr));