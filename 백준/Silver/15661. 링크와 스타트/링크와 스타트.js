const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let A = input.map(l => l.split(' ').map(Number))


const solution = () => {
    const arr = new Array(N).fill(false)
    let answer = Infinity


    for (let i = 0; i < N-1; i++) {
        helper(0, 0, i)
    }

    console.log(answer)

        
    function helper(L, index, target) {
        if (L === target) {
            calc()
            return
        }        

        for (let i = index; i < N; i++) {
            if (!arr[i]) {
                arr[i] = true
                helper(L+1, i+1, target)
                arr[i] = false
            }
        }
    }

    function calc() {
        let a = [], b = []
        for (let i in arr) {
            if (arr[i]) a.push(i)
            else b.push(i)
        }
        
        let aa = 0, bb = 0
        const len1 = a.length, len2 = b.length

        for (let i = 0; i < len1; i++) {
            const L = a[i]
            for (let j = i + 1; j < len1; j++) {
                const R = a[j]
                aa += A[L][R] + A[R][L]
            }
        }
        for (let i = 0; i < len2; i++) {
            const L = b[i]
            for (let j = i + 1; j < len2; j++) {
                const R = b[j]
                bb += A[L][R] + A[R][L]
            }
        }

        answer = Math.min(answer, Math.abs(aa - bb))        
    }

}

solution()