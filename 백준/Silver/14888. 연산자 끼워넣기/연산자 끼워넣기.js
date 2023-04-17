const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let A = input.shift().split(' ').map(Number)
const C = input.shift().split(' ').map(Number)


const solution = () => {
    let max = -Infinity, min = Infinity

    helper(1, C, A[0])
    console.log(max === 0 ? 0 : max)
    console.log(min === 0 ? 0 : min)
 

    function helper(L, CArr, prev) {
        if (L === N) {
            max = Math.max(max, prev)
            min = Math.min(min, prev)
            return
        }


        for (let i in CArr) {
            const c = CArr[i]
            
            if (c > 0) {
                const newCArr = [...CArr]
                newCArr[i] -= 1

                // 계싼
                let cur = prev
                if (i == 0) {
                    cur += A[L]
                } else if (i == 1) {
                    cur -= A[L]
                } else if (i == 2) {
                    cur *= A[L]
                } else {
                    if (cur < 0) {
                        cur = -Math.floor(Math.abs(cur) / A[L])
                    } else {
                        cur = Math.floor(cur / A[L]) 
                    }
                }

                helper(L + 1, newCArr, cur)
            }
        }
    }

}

solution()