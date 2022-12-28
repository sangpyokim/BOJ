const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

const solution = () => {
  const [startX, startY] = list[0];

  const getTri = (a, b) => {
    const [ax, ay] = a;
    const [bx, by] = b;
    return (ax - startX) * (by - startY) - (ay - startY) * (bx - startX);
  };

  let ans = 0;
  for (let i = 2; i < N; i++) {
    ans += getTri(list[i], list[i - 1]);
  }

  return (Math.abs(ans) * 0.5).toFixed(1);
};

console.log(solution())