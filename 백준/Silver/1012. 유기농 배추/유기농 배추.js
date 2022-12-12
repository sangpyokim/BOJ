let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const TC = +input.shift();
let data = input;
const maps = [];

for(let i=0; i<TC; i++) {
    let [M, N, K] = data.shift().split(' ').map(Number);
    let map = Array.from({length: N}).map(row => row = Array.from({length:M}).fill(0));

    for(let i=0; i<K; i++) {
        let [X, Y] = [+data[i].split(' ')[0], +data[i].split(' ')[1]]
        map[Y][X] = 1;
    }
    maps.push(map);
  data.splice(0, K);
  
  solution(map)
}

// ---------------------------------------------------------- //

function solution(arr) {
  const row = arr.length
  const col = arr[0].length
  const dir = [[1,0],[0,1],[-1,0],[0,-1]]
  let count = 0
  for (let i in arr) {
    for (let j in arr[i]) {
      if (arr[i][j]) {
        dfs(i * 1, j * 1)
        count += 1
      }
    }
  }

  function dfs(i, j) {
    if (arr[i][j] === 0) return 
    arr[i][j] = 0

    for (let [x, y] of dir) {
      const dx = i + x
      const dy = j + y
      if (dx >= 0 && dx < row && dy >= 0 && dy < col) {
        dfs(dx, dy)
      }
    }
  }

  console.log(count)
}