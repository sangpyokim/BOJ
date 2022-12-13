class PriorityQ {
    constructor(asc = false) { //Min heap true, Max heap false
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

let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

const M = +input.shift();

let matrix = input.map(line => line.split('').map(Number))

// ---------------------------------------------------------- //
const N = matrix.length

const edges = []
const dir = [[1, 0], [0, 1], [-1, 0], [0, -1]]
const isInside = (x, y) => x >= 00 && x < N && y >= 0 && y < N
const isWeight = (x, y) => 1 - matrix[x][y]
const pq = new PriorityQ()
const dist = Array.from({ length: N }, () => new Array(N).fill(Infinity))
const firstWeight = isWeight(0,0)
pq.push(firstWeight, [0,0])
dist[0][0] = firstWeight


while (pq.arr.length > 1) {
  const [curWeight, [i, j]] = pq.pop()
  if (dist[i][j] < curWeight) continue
  const nextDir = []
  for (let [x, y] of dir) {
    const dx = i + x
    const dy = j + y
    if (isInside(dx, dy)) nextDir.push([dx, dy])
  }

  for (let [x, y] of nextDir) {
    const nextWeight = isWeight(x, y)
    const sumWeight = curWeight + nextWeight
    // console.log(sumWeight, dist[x][y])
    if (sumWeight < dist[x][y]) {
      dist[x][y] = sumWeight
      pq.push(sumWeight, [x, y])
    }
  }
}

console.log(dist[N-1][N-1])