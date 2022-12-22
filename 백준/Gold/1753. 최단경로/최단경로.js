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

let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");
const [N, M] = input.shift().split(' ').map(Number)
const start = +input.shift()
const list = input.map(l => l.split(' ').map(Number))

const graph = []
for (let [x, y, z] of list) {
  if (!graph[x]) graph[x] = []
  graph[x].push([y, z])
}

const pq = new PriorityQ()
const dist = new Array(N+1).fill(Infinity)
pq.push(0, start)
dist[start] = 0

while (pq.arr.length > 1) {
  const [curWeight, curNode] = pq.pop()

  if (dist[curNode] < curWeight) continue

  const nextNodes = graph[curNode]
  if (!nextNodes) continue
  for (let [nextNode, nextWeight] of nextNodes) {
    const sumWeight = curWeight + nextWeight
    if (dist[nextNode] > sumWeight) {
      dist[nextNode] = sumWeight
      pq.push(sumWeight, nextNode)
    }
  }
}
let res = ''
for (let i = 1; i < dist.length; i++) {
  if (dist[i] === Infinity) res += 'INF' + '\n'
  else res += (dist[i]) + '\n'
}
console.log(res.trim())