const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M]= input.shift().split(' ').map(Number)
const [i, j, d] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

// ----------------------------------------------------
class Robot {
  constructor(i, j, d) {
    this.pos = [i, j]
    this.dir = d
  }
  move() {

  }
}

const dir = [[-1, 0], [0, 1], [1, 0], [0, -1]] // 북 동 남 서
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M

const robot = new Robot(i, j, d)
let count = 0

while (1) {
  // 청소
  const [i, j] = robot.pos
  if (list[i][j] === 0) count += 1
  list[i][j] = 2

  // 움직이기
  // 왼쪽부터 확인
  for (let k = 1; k <= 4; k++) {
    const robotDir = robot.dir + 4
    const nextDir = (robotDir - k) % 4
    const [x, y] = dir[nextDir]
    const dx = i + x
    const dy = j + y
    if (!isVal(dx, dy)) continue

    if (list[dx][dy] === 0) {
      robot.dir = nextDir
      robot.pos = [dx, dy]
      break;
    } 
  }
  // 4방향 모두 청소 되어있을 때
  const curPos = robot.pos
  if (curPos[0] === i && curPos[1] === j) {
    const robotDir = robot.dir
    const nextDir = (robotDir + 2) % 4
    const [x, y] = dir[nextDir]
    const dx = curPos[0] + x
    const dy = curPos[1] + y
    // 후진할 수 있다면 후진하기 못한다면 종료
    if (!isVal(dx, dy)) break;
    if (isVal(dx, dy) && list[dx][dy] === 1) break;
    
    robot.pos = [dx,dy]
  }
}

console.log(count)