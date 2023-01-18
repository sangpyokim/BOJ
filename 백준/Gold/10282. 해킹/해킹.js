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

