const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [R, C, K] = input.shift().split(' ').map(Number)
let A = input.map(l => l.split(''))


const solution = () => {
    const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]], visited = Array.from({ length: R }, () => new Array(C).fill(false))
    const isVal = (x, y) => x >= 0 && x < R && y >= 0 && y < C
    let answer = 0

    visited[R-1][0] = true
    helper(1, R - 1, 0)
    
    console.log(answer)
    
    function helper(L, i, j) {
        if (L === K) {
            if (i === 0 && j === C - 1) answer += 1

            return
        }

        for (let [x, y] of dir) {
            const dx = i + x
            const dy = j + y
            if (isVal(dx, dy) && !visited[dx][dy] && A[dx][dy] === '.') {
                visited[dx][dy] = true
                helper(L+1, dx, dy)
                visited[dx][dy] = false
            }
        }
    }
}

solution()