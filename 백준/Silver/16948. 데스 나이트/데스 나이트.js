const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const [r1,c1, r2,c2] = input.shift().split(' ').map(Number)

const dir = [[-2, -1], [-2, 1], [0, - 2], [0, 2], [2, -1], [2, 1]];
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N
const visited = new Set()

let q = [[r1, c1]], time = 0
visited.add(`${r1},${c1}`)

while (q.length) {
    temp = []

    for (let [i, j] of q) {
        if (i === r2 && j === c2) return console.log(time)

        for (let [x, y] of dir) {
            const dx = i + x
            const dy = j + y
            const key = `${dx},${dy}`
            if (isVal(dx, dy) && !visited.has(key)) {
                visited.add(key)
                temp.push([dx, dy])
            }
        }
    }
    time += 1
    q = temp
}

console.log(-1)