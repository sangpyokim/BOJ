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
    const max = this.arr[0]
    const end = this.arr.pop()
    const len = this.arr.length

    if (len === 0) return max || null
    
    // 내려가기
    this.arr[0] = end
    let index = 0
    const elem = this.arr[index]

    while (1) {
      let leftChildIndex = 2 * index + 1
      let rightChildIndex = 2 * index + 2
      let leftChild = null
      let rightChild = null
      let swap = null

      // 왼쪽자식
      if (leftChildIndex < len) {
        leftChild = this.arr[leftChildIndex]
        // 왼쪽 자식이 top보다 더 커버리면 swap에 임시저장
        if (leftChild.weight < elem.weight) {
          swap = leftChildIndex
        }
      }

      // 오른쪽자식
      if (rightChildIndex < len) {
        rightChild = this.arr[rightChildIndex]
        // 오른쪽자식이 top보다 크고, 왼쪽자식보다 크면 swap을 변경 시켜줌
        if (rightChild.weight < elem.weight && rightChild.weight < leftChild.weight) {
          swap = rightChildIndex
        }
      }

      if (swap === null) break;

      [this.arr[index], this.arr[swap]] = [this.arr[swap], elem]
      index = swap
    }

    return max
  }

}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M, R] = input.shift().split(' ').map(Number)
const list = input.shift().split(' ').map(Number)
const map = input.map(l => l.split(' ').map(Number))

// ------------------


const graph = {}
for (let [i, j, w] of map) {
  if (!graph[i]) graph[i] = []
  if (!graph[j]) graph[j] = []
  graph[i].push([j, w])
  graph[j].push([i, w])
}
let answer = 0
for (let i = 1; i <= N; i++) {
  const res = solution(i)
  answer = Math.max(res, answer)
}
console.log(answer)

function solution(startPoint) {
  const dist = new Array(N+1).fill(false)
  const pq = new PriorityQueue()

  dist[startPoint] = true
  pq.enqueue(0, startPoint)
  // M이 수색 가능한 최대 가중치
  // 가중치가 M 이상이면 수색 못함

  while (pq.arr.length) {
    const cur = pq.dequeue()
    const curWeight = cur.weight
    const curPoint = cur.val

    const nextNodes = graph[curPoint]
    if (!nextNodes) continue

    for (let [nextNode, nextWeight] of nextNodes) {
      const sumWeight = curWeight + nextWeight
      if (sumWeight <= M) {
        dist[nextNode] = true
        pq.enqueue(sumWeight, nextNode)
      }
    }
  }

  let sum = 0
  for (let i = 1; i <= N; i++) {
    if (dist[i] === true) sum += list[i-1]
  }

  return sum
}
