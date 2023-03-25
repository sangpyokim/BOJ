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
      const parIndex = Math.floor((index-1) / 2)
      const par = this.arr[parIndex]
      if (par.weight <= newNode.weight) break;

      [this.arr[parIndex], this.arr[index]] = [this.arr[index], this.arr[parIndex]]

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
      let leftChild = null
      let rightChild = null
      let swap = null
      
      if (leftChildIndex < len) {
        leftChild = this.arr[leftChildIndex]
        if (leftChild.weight < cur.weight) {
          swap = leftChildIndex
        }
      }  
      
      if (rightChildIndex < len) {
        rightChild = this.arr[rightChildIndex]
        if (rightChild.weight < cur.weight && rightChild.weight < leftChild.weight) {
          swap = rightChildIndex
        }
      }
      
      if (!swap) break;

      [ this.arr[index], this.arr[swap] ] = [this.arr[swap], this.arr[index]]
      index = swap
    }

    return res
  }
}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(Number)
const [s, t] = input.pop().split(' ').map(Number)
const list = input.map(l => l.split(' ').map(Number))

const pq = new PriorityQueue()
const graph = {}, dist = new Array(N+1).fill(Infinity)
for (let [x, y, z] of list) {
  if (!graph[x]) graph[x] = []
  if (!graph[y]) graph[y] = []
  graph[x].push([y,z])
  graph[y].push([x,z])
}

pq.enqueue(0, s)
dist[s] = 0

while (pq.arr.length) {
  const cur = pq.dequeue()
  const curWeight = cur.weight
  const curNode = cur.val

  if (dist[curNode] < curWeight) continue

  const nextNodes = graph[curNode]
  if (!nextNodes) continue
  for (let [nextNode, nextWeight] of nextNodes) {
    const sumWeight = curWeight + nextWeight
    if (sumWeight < dist[nextNode]) {
      dist[nextNode] = sumWeight
      pq.enqueue(sumWeight, nextNode)
    }
  }

}
console.log(dist[t])
