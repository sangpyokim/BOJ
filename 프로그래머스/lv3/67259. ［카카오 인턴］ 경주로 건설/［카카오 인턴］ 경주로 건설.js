function solution(board) {
    var answer = Infinity;
    const N = board.length

    const dir = [[0,1],[1,0],[0,-1],[-1,0]] // 우 하 좌 상
    const isVal = (x, y) => x >= 0 && x < N && y >= 0 && y < N
    const visited = Array.from({length: N}, () => Array.from({length: N}, () => new Array(4).fill(Infinity)))
    
    let q = [[0,0, 0,0], [0,0,1,0]]
    visited[0][0][0] = 0
    visited[0][0][1] = 0
    while(q.length) {
        const temp = []
        
        for (let [i, j, d, cost] of q) {
            for (let k in dir) {
                const [x,y] = dir[k]
                const dx = i + x
                const dy = j + y
                if (isVal(dx, dy) && board[dx][dy] === 0) {
                    let nextCost = cost
                    
                    d !== k*1 ? nextCost += 600 : nextCost += 100
                    if (visited[dx][dy][k] > nextCost) {
                        visited[dx][dy][k] = nextCost
                        temp.push([dx, dy, k*1, nextCost])
                    }
                    
                }
            }
        }
        q = temp
    }
    
    for (let x of visited[N-1][N-1]) {
        if (x >= 0) answer = Math.min(answer, x)
    }
    return answer
}

// bfs, 이전 방향 기록