const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, K] = input.shift().split(' ').map(Number)
// let A = input.map(l => l.split(''))


const solution = () => {
    const arr = []

    helper(0, 0, '')
    console.log(arr[K-1] || -1)
    
    function helper(L, sum, str) {
        if (sum >= N) {
            if (sum === N) arr.push(str)
            return
        }
        
        for (let i = 1; i <= 3; i++) {
            helper(L+1, sum + i, str === '' ? i : `${str}+${i}`)
        }

    }
}

solution()