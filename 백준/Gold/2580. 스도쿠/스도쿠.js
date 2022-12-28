const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const list = input.map(l => l.split(' ').map(String))


dfs(list)

let answer = ''
for (let x of list) {
  answer += x.join(' ') + '\n'
}

console.log(answer.trim())
// -----------------------------


function dfs(board, n = 9) {
  for (let row = 0; row < n; row++) { // row
    for (let col = 0; col < n; col++) { // col
      // 만약 빈공간이 아니라면 건너뛰기
      if (board[row][col] !== '0') continue; 
        
      // 1-9까지 대입
      for (let i = 1; i <= 9; i++) {
        const c = i.toString();
          
        // 넣어도되는 숫자라면
        if (isValid(board, row, col, n, c)) {
            // 숫자 교체
          board[row][col] = c;
          
          // dfs로 탐색
          if (dfs(board, n)) return true;
        }
      }
      // 1-9까지의 숫자를 넣을 수 없는 경우 다시 빈공간으로 바꿈
      board[row][col] = '0';
      // 다시 리턴시킴
      return false;
    }
  }
  // 완전 종료시(수도쿠 완성 시)
  return true;
}

function isValid(board, row, col, n, c) {
    // 가로 세로 3*3셀에 포함된 숫자인지 아닌지
  const blockRow = Math.floor(row / 3) * 3;
  const blockCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < n; i++) {
    if (board[row][i] === c || board[i][col] === c) return false;
    const curRow = blockRow +  Math.floor(i / 3);
    const curCol = blockCol +  Math.floor(i % 3);
    if (board[curRow][curCol] === c) return false;
  }
  return true;
}