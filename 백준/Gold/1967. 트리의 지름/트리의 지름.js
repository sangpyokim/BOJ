const fs = require('fs');
const filePath = process.platform === 'linux' ? '/dev/stdin' : 'input.txt';
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const n = +input.shift();
if (n === 1) return console.log(0);

const tree = Array.from({ length: n + 1 }, () => []);
input.map((i) => {
  const [from, to, dist] = i.trim().split(' ').map(Number);
  tree[from].push([to, dist]);
  tree[to].push([from, dist]);
});

function bfs(s) {
  const check = Array.from(n + 1, () => 0);
  const queue = [];
  queue.push([s, 0]);
  let farNode = { node: 0, dist: 0 };

  while (queue.length) {
    const [node, dist] = queue.shift();
    if (check[node]) continue;
    check[node] = 1;

    if (farNode.dist < dist) farNode = { node, dist };

    for (let [nextNode, nextDist] of tree[node]) {
      queue.push([nextNode, dist + nextDist]);
    }
  }
  return farNode;
}

console.log(bfs(bfs(1).node).dist);