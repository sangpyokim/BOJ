class PriorityQ {
    constructor(asc = true) { //Min heap true, Max heap false
        this.arr = new Array();
        this.arr.push('');
        this.asc = asc;
    }

    _compare(a, b){
        if (this.asc) {
            return a < b;
        } else {
            return a > b;
        }
    }

    _compareEq(a, b){
        if (this.asc) {
            return a <= b;
        } else {
            return a >= b;
        }
    }

    push(cost, elem) {
        this.arr.push([cost, elem]);
        let curPosition = this.arr.length-1;

        while (1 < curPosition && this._compare(this.arr[curPosition][0], this.arr[Math.floor(curPosition / 2)][0]) ) {
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
            if (curPosition * 2 + 1 < this.arr.length && this._compareEq(this.arr[curPosition * 2 + 1][0], this.arr[curPosition * 2][0]) && this._compare(this.arr[curPosition * 2 + 1][0],this.arr[curPosition][0])) { //양쪽이 있고 왼쪽이 작을 경우
                let tmp = this.arr[curPosition * 2 + 1];
                this.arr[curPosition * 2 + 1] = this.arr[curPosition];
                this.arr[curPosition] = tmp;
                curPosition = curPosition * 2 + 1;
            } else if (this._compare(this.arr[curPosition * 2][0],this.arr[curPosition][0])){
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
const [q, w] = input.pop().split(' ').map(Number)

const list = input.map(l => l.split(' ').map(Number))

const graph = []

for (let [x, y, w] of list) {
  if (!graph[x]) graph[x] = []
  if (!graph[y]) graph[y] = []
  graph[x].push([y, w])
  graph[y].push([x, w])
}

const a = helper(1, q) + helper(q, w) + helper(w, N)
const b = helper(1, w) + helper(w, q) + helper(q, N)

if (a === Infinity && b === Infinity) return console.log(-1)
else return console.log(Math.min(a,b))

function helper(s, t) {
  const pq = new PriorityQ()
  const dist = new Array(N+1).fill(Infinity)

  dist[s] = 0
  pq.push(0, s)

  while (pq.arr.length > 1) {
    const [curWeight, curNode] = pq.pop()
    const nextNodes = graph[curNode]

    if (dist[curNode] < curWeight || !nextNodes) continue
    
    for (let [nextNode, nextWeight] of nextNodes) {
      const sumWeight = curWeight + nextWeight
      if (dist[nextNode] > sumWeight) {
        dist[nextNode] = sumWeight
        pq.push(sumWeight, nextNode)
      }
    }
  }
  return dist[t]
}