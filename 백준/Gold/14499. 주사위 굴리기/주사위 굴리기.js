const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M, x, y, K] = input.shift().split(' ').map(Number)
const map = input.splice(0, N).map(l => l.split(' ').map(Number))
const orders = input.shift().split(' ').map(Number)

class Dice {
    top = 0
    bottom = 0
    left = 0
    right = 0
    floor = 0
    roof = 0

    goEast() {
        [this.floor, this.right, this.left, this.roof] = [ this.right, this.roof, this.floor, this.left]
    }
    goWest() {
        [this.floor, this.right, this.left, this.roof] = [ this.left, this.floor, this.roof, this.right]
    }
    goSouth() {
        [this.floor, this.bottom, this.roof, this.top] = [this.top, this.floor, this.bottom, this.roof]
    }
    goNorth() {
        [this.floor, this.bottom, this.roof, this.top] = [this.bottom, this.roof, this.top, this.floor]        
    }
}

const solution = () => {
    let answer = ''
    const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M, dir = [[], [0, 1], [0, -1], [-1, 0], [1, 0]]
    
    const dice = new Dice()


    for (let order of orders) {
        const [i, j] = dir[order]
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy)) {
            x = dx, y = dy
            if (order === 1) {
                dice.goEast()
            }
            else if (order === 2) {
                dice.goWest()
            }
            else if (order === 3) {
                dice.goNorth()
            }
            else if (order === 4) {
                dice.goSouth()
            }

            if (map[dx][dy] === 0) {
                map[dx][dy] = dice.floor
            } else {
                dice.floor = map[dx][dy]
                map[dx][dy] = 0
            }
            answer += dice.roof + '\n'
        }

    }


    return console.log(answer.trim())
}

solution()