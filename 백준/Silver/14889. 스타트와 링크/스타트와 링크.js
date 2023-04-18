const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
let A = input.map(l => l.split(' ').map(Number))

const solution = () => {
    const comb = new Map()
    const visited = Array.from({ length: N + 1 }, () => false)
    let answer = Infinity

    helper(0, 1)

    console.log(answer)

    function helper(L, index) {
        if (L === N / 2)  {
            // arr 요소들 값 계산하기
            let a = 0, b = 0

            for (let i = 0; i < N; i++) {
                for (let j = 0; j < N; j++) {
                    if (i === j) continue

                    if (visited[i+1] && visited[j+1]) a += A[i][j]
                    if (!visited[i+1] && !visited[j+1]) b += A[i][j]
                }
            }
            return answer = Math.min(answer, Math.abs(a - b))
        }

        for (let i = index; i <= N; i++) {
            visited[i] = true        
            helper(L + 1, i+1)
            visited[i] = false
        }
    }

}

solution()