const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list1 = input.splice(0, N)
const list2 = input.splice(0, N) 

// ----------------------------------------------------

const map = new Map()

for (let str of list1) {
  map.set(str, map.size)
}

let count = 0 // 추월한 차의 개수

for (let i in list1) {
  const x = list1[i]
  const y = list2[i]
  const findI = list1.findIndex(ele => ele === y)
  
  // list1랑 list2랑 비교해서 차의 위치가 다르다면 위치를 옮김
  if (i * 1 === findI) continue

  // 추월한 차량 위치 옮겨줌
  list1.splice(findI, 1) // 추월한 차량 제거
  list1.splice(i, 0, y) // 추월한 차량 추가
  count += 1
}

console.log(count)