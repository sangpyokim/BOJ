class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(item) {
    const node = new Node(item)
    if (this.head == null) {
      this.head = node;
    } else {
      this.tail.next = node;
    }

    this.tail = node;
    this.length += 1;
  }

  pop() {
    const popItem = this.head;
    this.head = this.head.next;
    this.length -= 1;
    return popItem.item;
  }
}
const fs = require('fs');
const input = fs.readFileSync("./dev/stdin").toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number);
let lake = input.map(v => v.trim().split(''));

function solve() {
  const dx = [0, 0, -1, 1];
  const dy = [-1, 1, 0, 0];
  let waterQ = new Queue();
  const swan = [];

  //find water, find swan
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (lake[i][j] == '.') {
        waterQ.push([i, j]);
      } else if (lake[i][j] == 'L') {
        swan.push([i, j])
        lake[i][j] = '.'
        waterQ.push([i, j]);
      }
    }
  }

  let days = 0;
  let visited = Array.from(Array(N), () => Array(M).fill(false));
  const [sx, sy] = swan[0];
  const [ex, ey] = swan[1];
  let swanQ = new Queue();
  const swanTemp = [];
  swanQ.push([sx, sy]);
  visited[sx][sy] = true;

  while (true) {
    // console.log(lake.map(v => v.join('')).join('\n'))
    //can swans meet? 

    while (swanQ.length > 0) {
      const [x, y] = swanQ.pop();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx == ex && ny == ey) {
          return days;
        } else if (nx >= 0 && ny >= 0 && nx < N && ny < M && !visited[nx][ny]) {
          if (lake[nx][ny] == '.') {
            swanQ.push([nx, ny]);
          } else {
            swanTemp.push([nx, ny])
          }
          visited[nx][ny] = true;
        }
      }
    }

    while (swanTemp.length > 0) {
      const [x, y] = swanTemp.shift();
      swanQ.push([x, y]);
    }



    // If swans can't meet, melt the ice
    const L = waterQ.length;
    for (let l = 0; l < L; l++) {
      const [x, y] = waterQ.pop();
      for (let i = 0; i < 4; i++) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        if (nx >= 0 && ny >= 0 && nx < N && ny < M && lake[nx][ny] == 'X') {
          waterQ.push([nx, ny]);
          lake[nx][ny] = '.'
        }
      }
    }
    days++;
  }
}

console.log(solve())