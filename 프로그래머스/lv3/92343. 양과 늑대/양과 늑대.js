function solution(info, edges) {
    var answer = 0;
    const len = info.length
    
    const graph = {}
    const ar = new Array(len).fill(0)
    
    for (let [to, from] of edges) {
        if (!graph[to]) graph[to] = []
        graph[to].push(from)
    }
    
    bfs(0)
    
    function bfs(start) {
        let q = [[start, 0, 0, new Set(), []]]
        let time = 5
        while(q.length) {
          const temp = []
          
          console.log("start")
          
          for (let [curNode, sheep, wolf, set, arr] of q) {
            info[curNode] === 0 ? sheep++ : wolf++
                
            if (sheep <= wolf || ar[curNode] > sheep) continue
            ar[curNode] = sheep
            answer = Math.max(answer, sheep)
            
            const newSet = new Set()
            for (let k of set) newSet.add(k)
            const nextNodes = graph[curNode]
            
            if (nextNodes) {
              for (let nextNode of nextNodes) newSet.add(nextNode)
            }
            
            newSet.delete(curNode)
                
            for (let nextNode of newSet) {
              temp.push([nextNode, sheep, wolf, newSet, [...arr, curNode]])
            }
            
                
          }
          
          q = temp
        }
    }
    return answer;
}