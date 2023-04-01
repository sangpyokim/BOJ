const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")

const [K, N] = input.shift().split(' ').map(Number)
const list = input.map(l => +l)

const answer = solution(K, N, list)
console.log(answer)

function solution(k, n, arr) {
    let right = Math.max(...arr), left = 1, res = 0

    while (left <= right) {
        const mid = (right + left) >>> 1

        let count = 0
        for (let num of arr) {
            count += div(num, mid)
        }
        
        if (count < n) right = mid -1
        else {
            left = mid + 1
            res = Math.max(res, mid)
        }

    }

    return right    
}

function div(num, divider) {
    return Math.floor(num / divider)
}

