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

    while (index > 0) {
      const parIndex = index >>> 1
      const par = this.arr[index]

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
      const leftChildIndex = index*2 + 1
      const rightChildIndex = index*2 + 2

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

const TC = +input.shift()

let index = 0
let answer = ''
for (let i = 0; i < TC; i++) {
  const [N, D, C] = input[index].split(' ').map(Number)
  index += 1
  const arr = input.slice(index, index + D).map(l => l.split(' ').map(Number))
  index += D

  const res = solution(N, arr, C)
  answer += res + '\n'
}

console.log(answer.trim())

// ------------------

function solution(N, list, start) {

  const graph = Array.from({ length: N + 1 }, () => new Array())
  const dist = new Array(N+1).fill(Infinity)
  const pq = new PriorityQueue()
  
  for (let [x, y, w] of list) {
    graph[y].push([x, w])
  }
  dist[start] = 0
  pq.enqueue(0, start)

  while (pq.arr.length) {
    const cur = pq.dequeue()
    const curWeight = cur.weight
    const curNode = cur.val

    if (dist[curNode] < curWeight) continue

    const nextNodes = graph[curNode]
    for (let [nextNode, nextWeight] of nextNodes) {
      const sumWeight = curWeight + nextWeight
      if (dist[nextNode] > sumWeight) {
        dist[nextNode] = sumWeight
        pq.enqueue(sumWeight, nextNode)
      }
    }
  }

  let max = 0
  let count = 0
  for (let x of dist) {
    if (x !== Infinity) {
      max = Math.max(max, x)
      count += 1
    }
  }
  return `${count} ${max}`
}

