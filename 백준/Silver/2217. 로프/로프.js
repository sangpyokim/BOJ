const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")

const N = +input.shift()
const list = input.map(Number)

solution(N, list)

function solution(n, list) {
    list.sort((a, b) => a - b);

    let answer = 0;

    for (let i = 0; i < n; i++){
        const cur = list[i]
        if (answer < cur * (n - i)) {            
            answer = cur * (n - i);
        }
    }

    console.log(answer);
}