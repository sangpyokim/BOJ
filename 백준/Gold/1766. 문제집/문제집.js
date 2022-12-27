class PriorityQ {
    constructor() {
        this.arr = new Array();
        this.arr.push('');
    }

    push(cost, elem) {
        this.arr.push([cost, elem]);
        let curPosition = this.arr.length-1;

        while (1 < curPosition && this.arr[curPosition][0] < this.arr[Math.floor(curPosition / 2)][0]) {
            let tmp = this.arr[Math.floor(curPosition / 2)];
            this.arr[Math.floor(curPosition / 2)] = this.arr[curPosition];
            this.arr[curPosition] = tmp;
            curPosition = Math.floor(curPosition / 2);
        }
    }

    pop(){
        if(this.arr.length <= 1) return null;
        let curPosition = 1;
        let last = this.arr[curPosition];
        if(2 < this.arr.length) this.arr[curPosition] = this.arr.pop();
        else this.arr.pop();

        while (curPosition * 2 < this.arr.length) {
            if (curPosition * 2 + 1 < this.arr.length && this.arr[curPosition * 2 + 1][0] <= this.arr[curPosition * 2][0] && this.arr[curPosition * 2 + 1][0] < this.arr[curPosition][0]) { //양쪽이 있고 왼쪽이 작을 경우
                    let tmp = this.arr[curPosition * 2 + 1];
                    this.arr[curPosition * 2 + 1] = this.arr[curPosition];
                    this.arr[curPosition] = tmp;
                    curPosition = curPosition * 2 + 1;
            } else if (this.arr[curPosition * 2][0] < this.arr[curPosition][0]){
                let tmp = this.arr[curPosition * 2];
                this.arr[curPosition * 2] = this.arr[curPosition];
                this.arr[curPosition] = tmp;
                curPosition = curPosition * 2;
            } else {
                break;
            }
        }

        return last;
    }
}


const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))
let k = 0
// solution
const graph = Array.from({ length: N + 1 }, () => [])
const degree = Array.from({ length: N + 1 }, () => 0)

for (let [x, y] of list) {
  graph[x].push(y)
  degree[y] += 1
}
const pq = new PriorityQ()

for (let i = 1; i <= N; i++) {
  if (degree[i] === 0) pq.push(i, i)
}

const res = khan(graph, degree)

console.log(res)




function khan(graph, degree) {
  const pq = new PriorityQ()
  for (let i = 1; i <= N; i++) {
    if (degree[i] === 0) pq.push(i, i)
  }
  const arr = []
  while (pq.arr.length > 1) {
    const [cur, _] = pq.pop()

    if (degree[cur] === 0) arr.push(cur)

    for (let nextNode of graph[cur]) {
      degree[nextNode] -= 1

      if (degree[nextNode] === 0) {
        pq.push(nextNode, nextNode)
      }
    }
  }
  return arr.join(' ')
}