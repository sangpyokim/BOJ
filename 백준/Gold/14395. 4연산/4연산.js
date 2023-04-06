const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, T] = input.shift().split(' ').map(Number)
if (N === T) return console.log(0)


const visited = new Set()
const isVal = (x) => x >= 0 && x<= T

let q = [[N, '']]
visited.add(N)



while (q.length) {
    let temp = [], arr = []

    for (let [num, str] of q) {
        if (num === T) {
            arr.push(str)
        }
        const a = num + num
        const b = num - num
        const c = num * num
        if (!visited.has(c) && isVal(c)) {
            visited.add(c)
            temp.push([c, str + '*'])
        }
        if (!visited.has(a) && isVal(a)) {
            temp.push([a, str+'+'])
            visited.add(a)
        }
        if (!visited.has(b) && isVal(b)) {
            visited.add(b)
            temp.push([b, str + '-'])
        }
        if (num !== 0) {
            const d = Math.floor(num / num)
            if (!visited.has(d) && isVal(d)) {
                temp.push([d, str + '/'])
                visited.add(d)
            }
        }
    }

    if (arr.length) {
        return console.log(arr[0])
    }
    q = temp
}

console.log(-1)