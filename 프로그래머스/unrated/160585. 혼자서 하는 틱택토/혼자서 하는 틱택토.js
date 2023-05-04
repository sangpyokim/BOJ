function solution(board) {
    const list = board.map(l => l.split(''))
    let O = 0, X = 0
    
    for (let i in list) {
        for (let j in list[i]) {
            if (list[i][j] === 'O') O += 1
            if (list[i][j] === 'X') X += 1
        }
    }
    if (O < X) return 0
    if (O - X > 1) return 0
    
    const isO = (x, y) => list[x][y] === 'O'
    const isX = (x, y) => list[x][y] === 'X'
    

    
    if (isO(0, 0) && isO(0, 1) && isO(0, 2) && O === X) return 0
    if (isO(1, 0) && isO(1, 1) && isO(1, 2) && O === X) return 0
    if (isO(2, 0) && isO(2, 1) && isO(2, 2) && O === X)  return 0
    
    if (isO(0, 0) && isO(1, 0) && isO(2, 0) && O === X) return 0
    if (isO(0, 1) && isO(1, 1) && isO(2, 1) && O === X) return 0
    if (isO(0, 2) && isO(1, 2) && isO(2, 2) && O === X) return 0
    
    if (isO(0, 0) && isO(1, 1) && isO(2, 2) && O === X) return 0
    if (isO(2, 0) && isO(1, 1) && isO(0, 2) && O === X) return 0
    
 // asd
    if (isX(0, 0) && isX(0, 1) && isX(0, 2) && O !== X) return 0
    if (isX(1, 0) && isX(1, 1) && isX(1, 2) && O !== X) return 0
    if (isX(2, 0) && isX(2, 1) && isX(2, 2) && O !== X) return 0
    
    if (isX(0, 0) && isX(1, 0) && isX(2, 0) && O !== X)  return 0
    if (isX(0, 1) && isX(1, 1) && isX(2, 1) && O !== X)  return 0
    if (isX(0, 2) && isX(1, 2) && isX(2, 2) && O !== X) return 0
    
    if (isX(0, 0) && isX(1, 1) && isX(2, 2) && O !== X) return 0
    if (isX(2, 0) && isX(1, 1) && isX(0, 2) && O !== X) return 0
    
    
    return 1;
}
// x의 개수가 더 많으면 안됨
// 3개가 연결되어있으면 안됨.