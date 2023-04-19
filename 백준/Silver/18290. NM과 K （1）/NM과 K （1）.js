const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, K] = input.shift().split(' ').map(Number)
let A = input.map(l => l.split(' ').map(Number))


const solution = () => {
    const selected = Array.from({ length: N }, () => new Array(M).fill(false))
    const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
    const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M

    let answer = -Infinity

    helper(0, 0)

    console.log(answer)

    function helper(L, sum) {
        if (L === K) {
            answer = Math.max(answer, sum)
            return
        }
        
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                if (selected[i][j]) continue

                let flag = true
                for (let [x, y] of dir) {
                    const dx = i + x
                    const dy = j + y
                    if (isVal(dx, dy)) {
                        if (selected[dx][dy]) flag = false
                    }
                }                
                
                if (!flag) continue 

                selected[i][j] = true

                helper(L+1, sum + A[i][j])
                
                selected[i][j] = false

            }
        }

    }
}

solution()