const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const K = +input.shift()
const list = input.map(l => l.split(' ').map(Number))
// ----------------------------
// 각 리프노드의 레벨 수를 더해서 홀수면 이김.

const visited = new Array(K + 1).fill(0);
const adjArr = Array.from({ length: K + 1 }, () => new Array());
list.forEach((el) => {
  const [from, to] = el;
  adjArr[from].push(to);
  adjArr[to].push(from);
});
let answer = 0;
const dfs = (node, depth) => {
  if (node !== 1 && adjArr[node].length === 1) {
    if (depth % 2 === 1) answer += 1;
    return;
  }

  visited[node] = 1;

  for (let i = 0; i < adjArr[node].length; i++) {
    if (!visited[adjArr[node][i]]) {
      dfs(adjArr[node][i], depth + 1);
    }
  }
};

dfs(1, 0);
answer % 2 === 1 ? console.log("Yes") : console.log("No");