function solution(commands) {
    var answer = [];
    
    const par = Array.from({ length: 50*50 }, (v, i) => [i, 'EMPTY'] )
    const find = (x) => par[x][0] === x ? par[x][0] : par[x][0] = find(par[x][0])
    const union = (x,y) => {
        x = find(x)
        y = find(y)
        
        par[y][0] = x 
    }
    
    for (let str of commands) {
        const [x, ...rest] = str.split(' ')
        
        if (x === 'UPDATE') update(rest)
        else if (x === 'MERGE') merge(rest)
        else if (x === 'UNMERGE') unmerge(rest)
        else if (x === 'PRINT') print(rest)
    }
    
    function print(rest) {
        const index = getIndex(rest[0], rest[1])
        const res = find(index)

       answer.push(par[res][1])
    }
    
    function unmerge(rest) {
        const index = getIndex(rest[0], rest[1])
        
        const findIndex = find(index)
        const val = par[findIndex][1]

        for (let i = 0; i < 50*50; i++) {
            if (par[i][0] === findIndex) {
                if (i === index) par[i] = [i, val]
                else par[i] = [i, 'EMPTY']
            }
        }
    }
    
    function merge(rest) {
        const index1 = getIndex(rest[0], rest[1])
        const index2 = getIndex(rest[2], rest[3])
        if (index1 === index2) return
        
        const a = find(index1)
        const b = find(index2)
        
        
        const str = par[a][1] === 'EMPTY' ? par[b][1] : par[a][1]
        
        par[a][1] = 'EMPTY'
        par[b][1] = 'EMPTY'
        union(index1, index2)
        par[a][1] = str
        
        for (let i in par) {
            par[i][0] = find(par[i][0])
        }
    }
    
    function update(rest) {
        if (rest.length === 2) {
            const [v1, v2] = rest
            for (let i = 0; i < 50*50; i++) {
                if (par[i][1] === v1) par[i][1] = v2
            }
            
            return
        }
        
        
        const index = getIndex(rest[0], rest[1])
        const findIndex = find(index)
        
        par[findIndex][1] = rest[2]
    }
    
    return answer;
}

function getIndex(i, j) {
    const a = i*1 -1, b = j*1 - 1
    return a * 50 + b   
}