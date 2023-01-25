const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const map = input.map(l => l.split(' '))

// ----------------------------

// 장애물 3개의 모든 조합찾기 -> 하나씩 되나안되나 보기
const dir = [[1,0], [0,1], [-1,0], [0,-1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N

const arr = []
const TArr = []
const SArr = []
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (map[i][j] === 'X') {
      arr.push(i*N + j)
    }
    else if (map[i][j] === 'T') TArr.push([i, j, -1])
    else if (map[i][j] === 'S') SArr.push([i, j])
  }
}

const permu = []

perm(-1, [])

let answer = 'NO'

for (let p of permu) {
  updateMap(p)
  const res = bfs()
  if (res) return console.log('YES')
  updateMap(p)
}
console.log(answer)
// updateMap([3, 6, 12])
// bfs()

function updateMap(p) {
  for (let num of p) {
    const i = Math.floor(num / N)
    const j = num % N
    map[i][j] === 'O' ? map[i][j] = 'X' : map[i][j] = 'O'    
  }
}

// 선생이 학생찾으면 return false
function bfs() {
  // console.log(map)
  let q = [...TArr]

  while (q.length) {
    const temp = []
    
    for (let [i, j, d] of q) {
      // 학생 찾음
      if (map[i][j] === 'S') return false

      // 한 뱡향으로만 움직이기
      if (d === -1) {
        for (let k in dir) {
          const [x, y] = dir[k]
          const dx = i + x
          const dy = j + y
          if (isVal(dx, dy) && map[dx][dy] !== 'O') {
            temp.push([dx,dy, k])
          }
        }
      } else {
        const [x, y] = dir[d]
        const dx = i + x
        const dy = j + y
        if (isVal(dx, dy) && map[dx][dy] !== 'O') {
          temp.push([dx, dy, d])
        }
      }

    }

    q = temp
  }

  return true
}




function perm(L, a) {
  if (a.length === 3) return permu.push(a)
  // console.log(L, a)
  for (let i = L+1; i < arr.length; i++) {
    perm(i, [...a, arr[i]])
  }
}