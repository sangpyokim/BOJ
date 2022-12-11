function solution(rectangle, characterX, characterY, itemX, itemY) {
    var answer = Infinity;
    const max = Math.max(...rectangle.flat())*2
    const matrix = Array.from({length: max+1}, () => new Array(max+1).fill(false))
    const visited = Array.from({length: max+1}, () => new Array(max+1).fill(false))
    const dir = [[1,0],[0,1],[-1,0],[0,-1]]
    
    for (let [a,b,c,d] of rectangle) {
        fillMatrix(a*2,b*2,c*2,d*2)
    }
    
    for (let [a,b,c,d] of rectangle) {
        filloutMatrix(a*2,b*2,c*2,d*2)
    }
    
    dfs(characterX*2, characterY*2, 0)
    
    function fillMatrix(a,b,c,d) {
        for (let i = a; i <= c; i++) {
            for (let j = b; j <= d; j++) {
                matrix[i][j] = true
            }
        }
    }
    function filloutMatrix(a,b,c,d) {
       for (let i = a+1; i < c; i++) {
            for (let j = b+1; j < d; j++) {
                matrix[i][j] = false
            }
        } 
    }
    // console.log(matrix)
    function dfs(i, j, sum) {
        if (i === itemX*2 && j === itemY*2) return answer = Math.min(answer, sum/2)
        if (visited[i][j] || matrix[i][j] === false) return
        visited[i][j] = true

        for (let [x, y] of dir) {
            const dx = i + x
            const dy = j + y
            if (dx >= 0 && dx <= max && dy >= 0 && dy <= max) {
                dfs(dx, dy, sum+1)
            }
        }
        
        // visited[i][j] = false
    }
    
    return answer;
}
