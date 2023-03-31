const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")

const N = +input.shift()
const list1 = input[0].split(' ').map(Number)
const list2 = input[1].split(' ').map(Number)

// 카운팅정렬, 차이가 제일 많이나는 순으로
const count = new Array(101).fill(0)

for (let x of list1) {
    count[x] += 1
}

list2.sort((a, b) => b - a)
let answer = 0

for (let i in list2) {
    const cur = list2[i]

    for (let j in count) {
        if (count[j] > 0) {
            count[j] -= 1
            answer += cur * (j*1)
            break;
        }
    }
}
console.log(answer)