function solution(maps) {
    var answer = [];
    const list = maps.map(l => l.split(''))
    
    const row = list.length, col = list[0].length
    const visited = Array.from({length: row}, () => new Array(col).fill(false))
    const dir = [[1,0],[0,1],[-1,0],[0,-1]]
    const isVal = (x, y) => x >= 0 && x < row && y>= 0 && y < col
    
    
    for (let i in list) {
        for (let j in list[i]) {
            if (list[i][j] !== 'X' && !visited[i][j]) {
                const res = bfs(i*1, j*1)
                answer.push(res)
            }
        }
    }
    
    
    function bfs(i, j) {
        let q = [[i, j]], food = 0
        visited[i][j] = true
        
        while(q.length) {
            const temp = []
            
            for (let [i, j] of q) {
                food += list[i][j]*1
                
                for (let [x , y] of dir) {
                    const dx = i + x, dy = j + y
                    
                    if (isVal(dx, dy) && !visited[dx][dy] && list[dx][dy] !== 'X') {
                        visited[dx][dy] = true
                        temp.push([dx, dy])
                    }
                }
            }
            
            q = temp
        }
        
        return food
    }
    
    
    if (!answer.length) return [-1]
    return answer.sort((a,b) => a-b);
}