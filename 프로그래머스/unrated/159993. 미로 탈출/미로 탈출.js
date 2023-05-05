function solution(maps) {
    var answer = 0;
    const list = maps.map(l => l.split(''))
    
    let start, end, swit
    for (let i in list) {
        for (let j in list[i]) {
            if (list[i][j] === 'S') start = [i*1, j*1]
            else if (list[i][j] === 'E') end = [i*1, j*1]
            else if (list[i][j] === 'L') swit = [i*1, j*1]
        }
    }
    
    const a = bfs(list, start, 'L')
    const b = bfs(list, swit, 'E')
    if (a === -1 || b === -1) return -1

    
    return a+b;
}

function bfs(map, start, target) {
    const row = map.length, col = map[0].length, dir = [[1,0],[0,1],[-1,0],[0,-1]]
    const isVal = (x, y) => x >= 0 && x < row && y >= 0 && y < col 
    const visited = Array.from({length: row}, () => new Array(col).fill(false))
    let q = [[...start]], time = 0
    
    while(q.length){
        const temp = []
        
        for (let [i, j] of q) {
            if (map[i][j] == target) return time
            
            for (let [x, y] of dir) {
                const dx = i+x
                const dy = j + y
                if (isVal(dx, dy) && !visited[dx][dy] && map[dx][dy] !== 'X') {
                    visited[dx][dy] = true
                    temp.push([dx,dy])
                }
            }
        }

        time += 1
        q = temp
    }
    
    
    return -1
}