const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const map = input.map(l => l.split('').map(Number))
// ------------------

const ch = Array.from(new Array(N), () => new Array());
const dx = [1, 0, -1, 0];
const dy = [0, 1, 0, -1];
const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < M
const queue = [];

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    ch[i][j] = new Array(2).fill(0);
  }
}

queue.push([0, 0, 0]);
ch[0][0][0] = 1;

function bfs() {
  let time = 0;

  while (time !== queue.length) {
    const [y, x, isBreak] = queue[time];

    if (x === M - 1 && y === N - 1) return ch[y][x][isBreak];

    for (let i = 0; i < dx.length; i++) {
      const [nx, ny] = [x + dx[i], y + dy[i]];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N) {
        if (map[ny][nx] === 0 && ch[ny][nx][isBreak] === 0) {
          ch[ny][nx][isBreak] = ch[y][x][isBreak] + 1;
          queue.push([ny, nx, isBreak]);
        } else if (map[ny][nx] === 1 && isBreak === 0) {
          ch[ny][nx][isBreak + 1] = ch[y][x][isBreak] + 1;
          queue.push([ny, nx, isBreak + 1]);
        }
      }
    }
    time++;
  }

  return -1;
}

console.log(bfs());