class Node {
  constructor(weight, val) {
    this.weight = weight
    this.val = val
  }
}
class PriorityQueue {
  constructor() {
    this.arr = []
  }

  enqueue(weight, val) {
    const newNode = new Node(weight, val)
    this.arr.push(newNode)

    let index = this.arr.length-1
    // 부모보다 작으면 바꾸기
    while (true) {
      const parIndex = index >>> 1
      const par = this.arr[parIndex]
      if (par.weight <= newNode.weight) break;

      [this.arr[parIndex], this.arr[index]] = [newNode, par]

      index = parIndex
    }
  }

  dequeue() {
    const res = this.arr[0]
    const tail = this.arr.pop()
    const len = this.arr.length

    if (len === 0) return res

    this.arr[0] = tail
    let index = 0
    const cur = this.arr[index]

    while (true) {
      const leftChildIndex = index * 2 + 1
      const rightChildIndex = index * 2 + 2

      if (rightChildIndex >= len) break;

      let leftChild = this.arr[leftChildIndex]
      let rightChild = this.arr[rightChildIndex]
      let swap = null


      if (leftChild.weight < cur.weight) {
        swap = leftChildIndex
      }

      if (rightChild.weight < cur.weight && rightChild.weight < leftChild.weight) {
        swap = rightChildIndex
      }

      if (!swap) break;

      [ this.arr[index], this.arr[swap] ] = [this.arr[swap], cur]
      index = swap
    }

    return res
  }

}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
const M = +input.shift()
const [s, t] = input.pop().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

// ------------------
let answer = ''
const [w, c, a] = solution(N, list, s, t)
answer += w + '\n'
answer += c + '\n'
answer += a.join(' ')
console.log(answer)

function solution(N, list, start,target) {
  const dist = new Array(N+1).fill(Infinity)
  const pq = new PriorityQueue()

  const graph = Array.from({length: N+1}, () => new Map())
  for (let [x, y, w] of list) {
    graph[x].set(y, Math.min(graph[x].get(y), w) || w)
  }

  dist[start] = 0
  pq.enqueue(0, [start, 1, [start]])
 
  let res = []
  let min = Infinity

  while (pq.arr.length) {
    const cur = pq.dequeue()
    const curWeight = cur.weight
    const [curNode, count, arr] = cur.val

    if (curNode === target && min > curWeight) {
      min = curWeight
      res = [curWeight, count, arr]
    }
    if (dist[curNode] < curWeight) continue
    

    const nextNodes = graph[curNode]
    if (!nextNodes) continue

    for (let [nextNode, nextWeight] of nextNodes) {
      const sumWeight = curWeight + nextWeight
      if (dist[nextNode] > sumWeight) {
        dist[nextNode] = sumWeight
        pq.enqueue(sumWeight, [nextNode, count + 1, [...arr, nextNode]])
      }
    }
  }

  return res
}

