const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
let A = input.shift().split(' ').map(Number).sort((a,b) => a - b)

const solution = () => {
    const set = new Set(), strSet = new Set()
    let answer = ''

    helper(0, '')

    strSet.forEach(str => answer += str.trim() + '\n')

    console.log(answer.trim())
        
    function helper(L, str) {
        if (L === M) {
            if (!strSet.has(str)) {
                strSet.add(str)
            }
            return 
        }

        for (let i = 0; i < N; i++) {
            if (!set.has(i)) {
                set.add(i)
                helper(L + 1, `${str} ${A[i]}`)
                set.delete(i)
            }
        }
    }

}

solution()