function solution(board) {
    var answer = 0;
    const list = board.map(l => l.split(''))
    const row = list.length, col = list[0].length
    const isVal = (x, y) => x >= 0 && x < row && y >= 0 && y < col;
    const dir = [[1,0],[0,1],[-1,0],[0,-1]];
    
    let q = [], visited = Array.from({length: 4}, () => Array.from({length: row}, () => new Array(col).fill(false))) 
    
    for (let i in list) {
        for (let j in list[0]) {
            if (list[i][j] === 'R') q.push([i*1, j*1])
        }
    }
    
    while(q.length) {
        const temp = []
        
        for (let [i, j] of q) {
            if (list[i][j] === 'G') return answer;
            
            for (let d in dir) {
                const [x, y] = dir[d]
                let dx = i + x
                let dy = j + y
                
                while (isVal(dx, dy) && list[dx][dy] !== 'D' && !visited[d][dx][dy]) {
                    visited[d][dx][dy] = true
                    
                    if (isVal(dx + x, dy + y) && list[dx + x][dy + y] !== 'D') {                        
                        dx += x
                        dy += y
                    } else {
                        temp.push([dx, dy])
                        break
                    }
                }
            }
        }
        answer += 1
        q = temp
    }
    
    
    return -1;
}