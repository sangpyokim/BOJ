const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let A = input.shift().split(' ')

const solution = () => {
    const set = new Set()
    let max = -Infinity, min = Infinity

    for (let i = 0; i < 10; i++) {
        set.add(i)
        helper(0, String(i), i)
        set.delete(i)
    }

    console.log(max)
    console.log(min)

        
    function helper(L, str, prev) {
        if (L === N) {
            if (max < str) {
                max = str
            }
            if (min > str) {
                min = str
            }

            return
        }        

        for (let i = 0; i < 10; i++) {
            if (!set.has(i)) {
                if (A[L] === '<' && prev < i) {
                    set.add(i)
                    helper(L+1, str + String(i), i)
                    set.delete(i)
                } else if (A[L] === '>' && prev > i) {
                    set.add(i)
                    helper(L+1, str + String(i), i)
                    set.delete(i)
                }
            }
        }
        
    }

}

solution()