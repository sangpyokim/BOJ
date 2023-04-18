const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let A = input.shift().split(' ').map(Number)

const solution = () => {
    const set = new Set()
    let answer = -Infinity


    for (let i = 0; i < N; i++) {
        set.add(i)
        helper(1, [i])
        set.delete(i)
    }

    console.log(answer)

    function helper(L, arr) {
        if (L === N)  {
            // arr 요소들 값 계산하기
            let sum = 0, prev = A[arr[0]]
            for (let i = 1; i < N; i++) {
                const cur = A[arr[i]]
                sum += Math.abs(prev - cur)
                prev = cur
            }
            return answer = Math.max(answer, sum)
        }

        for (let i = 0; i < N; i++) {
            if (!set.has(i)) {
                set.add(i)
                helper(L + 1, [...arr, i])
                set.delete(i)
            }
        }
    }

}

solution()