const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let A = input.map(l => l.split(' ').map(Number))

const solution = () => {
    const set = new Set()
    let answer = Infinity

    for (let i = 0; i < N; i++) {
        set.add(i)
        helper(1, 0, i, i)
        set.delete(i)
    }

    console.log(answer)

        
    function helper(L, cost, prev, start) {
        if (L === N) {
            if (A[prev][start] !== 0) {
                answer = Math.min(answer, cost + A[prev][start])
            }
            return
        }        

        for (let i = 0; i < N; i++) {
            if (!set.has(i) && A[prev][i] !== 0) {
                set.add(i)
                helper(L + 1, cost + A[prev][i], i, start)
                set.delete(i)
            }
        }
    }

}

solution()