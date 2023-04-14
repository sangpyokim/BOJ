const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const a = input.splice(0, 4).map(l => l.split('').map(Number))
const K = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

class Gear {
    list
    index
    constructor(list) {
        this.list = list
        this.index = 0
    }

    rotate(type) {
        if (type === 1) {
            this.index -= 1
            if (this.index < 0) this.index = 7
        } else {
            this.index += 1
            this.index %= 8
        }
    }

    getLeft() {
        let res = this.index - 2
        res += 8
        res %= 8
        return res
    }
    getRight() {
        let res = this.index + 2
        return res % 8
    }
}

const init = (items) => {
    const classes = []
    for (let item of items) classes.push(new Gear(item))
    return classes
}

const rotate = (N, D, items) => {
    const dir = [-1, 1], visited = new Set()
    const isVal = (x) => x >= 0 && x < 4
    let q = [[N, D]]

    while (q.length) {
        const temp = []

        for (let [n, d] of q) {
            if (visited.has(n)) continue
            visited.add(n)

            const cur = items[n]
            const curRight = cur.getRight()
            const curLeft = cur.getLeft()

            cur.rotate(d)

            for (let x of dir) {
                const nextN = n + x
                if (isVal(nextN)) {
                    const next = items[nextN]
                    if (x === -1) {
                        const nextRight = next.getRight()
                        if (cur.list[curLeft] !== next.list[nextRight]) temp.push([nextN, -d])
                    } else {
                        const nextLeft = next.getLeft()
                        if (cur.list[curRight] !== next.list[nextLeft]) temp.push([nextN, -d])
                    }
                }
            }

        }
        q = temp
    }

}

const solution = (itemList, K, list) => {
    const items = init(itemList)
    let index = 0

    while (index < K) {
        const [N, D] = list[index]

        rotate(N-1, D, items)

        index += 1
    }

    let answer = 0

    for (let x in items) {
        const item = items[x]
        const i = item.index
        const d = item.list[i]
        if (d === 1) {
            answer += Math.pow(2, x)
        }
    }
    console.log(answer)

}
solution(a, K, list)