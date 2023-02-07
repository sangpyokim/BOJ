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

function solution(n, s, a, b, fares) {
    var answer = Infinity;
    const cache = Array.from({length: n+1}, () => new Array(n+1).fill(Infinity))
    const graph = {}

    for (let [x, y, w] of fares) {
        if (!graph[x]) graph[x] = []
        if (!graph[y]) graph[y] = []
        graph[x].push([y, w])
        graph[y].push([x, w])
    }
    

    // n log n * n + 캐시?
    // n * n
    for (let i = 1; i <= n; i++) {
        let sum
//         if (i === a) {
//             sum = getMinDist(s, i) + getMinDist(i, b)
//         } else if (i === b) {
//             sum = getMinDist(s, i) + getMinDist(i, a)
//         } else {
            
//         }
        sum = getMinDist(s, i) + getMinDist(i, a) + getMinDist(i, b)
        answer = Math.min(answer, sum)
    }
    
    function getMinDist(to, from) {
        if (cache[to][from] !== Infinity) return cache[to][from]
        if (to === from) return 0
        const pq = new PriorityQueue()
        const dist = new Array(n+1).fill(Infinity)
        pq.enqueue(0, to)
        dist[to] = 0

        while(pq.arr.length) {
            const cur = pq.dequeue()
            const curWeight = cur.weight
            const curNode = cur.val
            if (dist[curNode] < curWeight) continue
            
            const nextNodes = graph[curNode]
            if (!nextNodes) continue
            for (let [nextNode, nextWeight] of nextNodes) {
                const sumWeight = curWeight + nextWeight
                if (dist[nextNode] > sumWeight) {
                    dist[nextNode] = sumWeight
                    pq.enqueue(sumWeight, nextNode)
                }
            }
        }

        for (let i in dist) {
            cache[to][i] = Math.min(cache[to][i], dist[i])
            cache[i][to] = Math.min(cache[i][to], dist[i])
        }
        
        return dist[from]
    }

    return answer
}
// 3가지 노선 경우의 수
// 택시 -> a -> b
// 택시 -> b -> a  
// 택시 -> a + 택시 -> b