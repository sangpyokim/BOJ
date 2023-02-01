const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

// ----------------------------
const surface = [5,3,4,1,2,0]

let answer = 0

// 1번 주사위의 아랫 면
for (let i = 0; i < 6; i++) {
  dfs(0, list[0][i], 0) 
}


console.log(answer)

function dfs(L, floorValue, sum) {
  if (L === N) return answer = Math.max(answer, sum)

  const floorIndex = list[L].findIndex(ele => ele === floorValue)
  const crossIndex = getCrossIndex(list[L], floorIndex)

  const crossValue = list[L][crossIndex]
  // 1~6중에 둘이랑 겹치면안됌
  let max = 0 
  for (let i = 1; i <= 6; i++) {
    if (i === floorValue || i === crossValue) continue

    max = Math.max(max, i)
  }
  
  dfs(L+1, crossValue, sum + max)

}


function getCrossIndex(arr, index) {
  return surface[index]
}
