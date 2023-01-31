const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const TC = +input.shift()
let answer = ''
for (let i = 0; i < TC; i++) {
  const N = +input.shift()
  const prevList = input.shift().split(' ').map(Number)
  const M = +input.shift()
  const list = []
  for (let j = 0; j < M; j++) {
    list.push(input.shift().split(' ').map(Number))
  }
  const res = solution(N, prevList, M, list)
  answer += res + '\n'
}
console.log(answer.trim())
// ----------------------------

function solution(N, prevList, M, list) {

  const adjList = Array.from({length: N+1}, () => new Array(N+1).fill(false))
  const indegree = new Array(N + 1).fill(0)
  
  for (let i = 0; i < N-1; i++) {
    for (let j = i + 1; j < N; j++) {
      const cur = prevList[i]
      adjList[cur][prevList[j]] = true
      indegree[prevList[j]] += 1
    }
  }

  for (let i = 0; i < M; i++) {
      const [a, b] = list[i]
        // 원래 a가 b 앞이었던 경우
        if(adjList[a][b]){
            adjList[a][b] = false;
            adjList[b][a] = true;
            // b가 a 앞이 된다 생각
            indegree[b]--;
            indegree[a]++;
        }
        // 원래 b가 a 앞이었던 경우
        else {
            adjList[b][a] = false;
            adjList[a][b] = true;
            indegree[a]--;
            indegree[b]++;
        }
    }



  let q = []
  let res = ''
  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      q.push(i)
    } 
  }

  let prereq = 0
  while (q.length) {
    const temp = []

    for (let cur of q) {
      if (indegree[cur] === 0) res += cur + ' '
      prereq += 1

      const nextNodes = adjList[cur]
      for (let i in nextNodes) {
        const nextNode = nextNodes[i]
        if (nextNode !== 0) {
          indegree[i] -= 1
          if (indegree[i] === 0) {
            temp.push(i)
          }
        }
      }
    }

    q = temp
  }
  return prereq === N ? res : 'IMPOSSIBLE'
}