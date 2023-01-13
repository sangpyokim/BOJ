const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, D] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))
// ------------------
const dir = [[0, -1],[-1, 0], [0, 1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M

const comb = getCombinations(new Array(M).fill(0).map((_, i) => i), 3)

let answer = 0

for (let arr of comb) {
  const killCount = bfs(arr)
  answer = Math.max(answer, killCount)
}
console.log(answer)

function bfs(arr) {
  const visited = list.map(l => l.map(v => v))
  let killCount = 0
  for (let times = 0; times < N; times++) {
    const enemyList = []
    // 궁수는 3명
    for (let k = 0; k < 3; k++) {
      // bfs, 현재 사정거리 내에서 적군찾기
      const map = visited.map(l => l.map(v => v))
      let turn = D
      const archerPos = [N, arr[k]]
      const an = []
      let q = [archerPos]
      while (turn) {
        const temp = []
        
        for (let [i, j] of q) {
          
          if (isVal(i, j)) map[i][j] = 2
          
          for (let [x, y] of dir) {
            const dx = x + i
            const dy = j + y
            if (isVal(dx, dy) && map[dx][dy] !== 2) {
              if (map[dx][dy] === 1) an.push([dx, dy])
              temp.push([dx, dy])
            }
          }
        }
        // 적군을 찾으면 가장왼쪽의 적군을 넣기
        if (an.length > 0) {
          an.sort((a, b) => a[1] - b[1])
          enemyList.push(an[0])
          break;
        }

        turn -= 1
        q = temp
      }
    }
    // 적군 제거
    // console.log("enemy",enemyList)
    for (let [x, y] of enemyList) {
      if (visited[x][y] === 1) killCount += 1
      visited[x][y] = 0
    }
    // console.log(killCount)
    
    // 적군 진군, visited 2를 0으로 바꿔줌
    for (let i = N - 1; i >= 0; i--) {
      for (let j = M - 1; j >= 0; j--) {
        // 맨아래 적들 탈락
        if (i === N - 1) {
          if (visited[i][j] === 1) visited[i][j] = 0
        }
        else if (visited[i][j] === 1) {
          visited[i][j] = 0
          visited[i+1][j] = 1
        }
      }
    }
  }
  return killCount
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