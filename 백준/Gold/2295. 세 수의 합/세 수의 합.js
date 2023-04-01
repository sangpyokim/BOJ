const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n")

const N = +input.shift()
const list = input.map(l => +l)

list.sort((a, b) => a - b);
const len = list.length
const set = new Set(), two = []
for (let x of list) {
    set.add(x)
}

for (let i in list) {
    for (let j in list) {
        two.push(list[i] + list[j])
    }
}

two.sort((a, b) => a - b)

for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < len; j++) {
        const res = binarySearch(two, list[i] - list[j])
        if (res) return console.log(list[i])
    }
}

function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1
    while (left < right) {
        const mid = (right + left) >>> 1
        const cur = arr[mid]

        if (cur === target) return true

        if (cur > target) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    return false
}