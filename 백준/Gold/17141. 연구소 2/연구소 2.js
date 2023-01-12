const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))
// ------------------
const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N

// 1. M개의 바이러스 위치 조합
// 2. bfs로 시간 측정
// 3. 최소시간을 넘어가면 bfs 종료
const virus = []
for (let i in list) {
  for (let j in list[i]) {
    if (list[i][j] === 2) virus.push([i, j])
  }
}

const comb = getCombinations(virus.map((v, i) => i), M);
let globalTime = Infinity
for (let arr of comb) {
  const time = bfs(arr)
  globalTime = Math.min(globalTime, time)
}

console.log(globalTime === Infinity ? -1 : globalTime)



function bfs(comb) {
  let q = []
  const visited = list.map(l => l.map(r => r))

  for (let x of comb) {
    const [a, b] = virus[x]
    visited[a][b] = 3
    q.push([a*1, b*1])
  }
  let time = 0
  while (q.length) {
    const temp = []

    for (let [i, j] of q) {
      for (let [x, y] of dir) {
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && (visited[dx][dy] === 0 || visited[dx][dy] === 2) && visited[dx][dy] !== 3) {
          visited[dx][dy] = 3
          temp.push([dx, dy])
        }
      }
    }
    if (temp.length === 0) break; 
    time += 1
    q = temp
  }
  
  // 체크
  if (check(visited)) return time
  return Infinity
}

function check(visited) {
  for (let i in visited) {
    for (let j in visited[i]) {
      if (visited[i][j] === 0) return false
    }
  }
  return true
}


function getCombinations(arr, selectNumber) {
  const results = [];
  if (selectNumber === 1) return arr.map((value) => [value]); // 1개씩 택할 때, 바로 모든 배열의 원소 return

  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1); // 해당하는 fixed를 제외한 나머지 뒤
    const combinations = getCombinations(rest, selectNumber - 1); // 나머지에 대해서 조합을 구한다.
    const attached = combinations.map((combination) => [fixed, ...combination]); //  돌아온 조합에 떼 놓은(fixed) 값 붙이기
    results.push(...attached); // 배열 spread syntax 로 모두 다 push
  });

  return results; // 결과가 담긴 results를 return
};