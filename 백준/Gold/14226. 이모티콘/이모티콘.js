const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()

// 복사 / 붙혀넣기 따로

let q = [[1, 0]], time= 0 // 현재 개수, 클립보드 개수
const visited = new Set()


while (q.length) {
  const temp = []

  for (let [cur, clip] of q) {
    if (cur === N) return console.log(time)
    const key1 = `${cur},${cur}`
    const key2 = `${cur-1},${clip}`
    const key3 = `${cur + clip},${clip}`
    if (!visited.has(key1)) {
      visited.add(key1)
      temp.push([cur, cur]) // 복사
    }

    if (!visited.has(key2)) {
      visited.add(key2)
      temp.push([cur - 1, clip]) // 감소
    }

    if (!visited.has(key3)) {
      visited.add(key3)
      temp.push([cur + clip, clip]) // 복사
    }
  }

  time += 1
  q = temp
}