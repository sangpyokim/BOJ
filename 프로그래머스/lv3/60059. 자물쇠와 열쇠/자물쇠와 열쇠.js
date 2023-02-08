function solution(key, lock) {
    const N = lock.length
    const KLen = key.length
    
    const tempArr = []
    for (let i = 0; i < KLen-1; i++) {
        const arr = new Array(KLen-1).fill(2)
        tempArr.push(arr)
    }
    
    const a = tempArr.concat(lock)
    const b = a.concat(tempArr)
    
    const map = []
    for (let i in b) {
        const arr = b[i]
        const c = new Array(KLen-1).fill(2).concat(arr)
        const d = c.concat(new Array(KLen-1).fill(2))
        map.push(d)
    }

    for (let i = 0; i < N+KLen-1; i++) {
        for (let j = 0; j < N+KLen-1; j++) {
            for (let k = 0 ; k < 4; k++ ) {
                const res = isMatch(i*1, j*1)
                rotate(key)
                if (res) return true
            }
        }
    }
    function isMatch(r, c) {
        let tmpLock = JSON.parse(JSON.stringify(map));
        for (let i=0; i<key.length; i++) {
            for (let j=0; j<key.length; j++) {
                if (r+i >= tmpLock.length || c+j >= tmpLock.length || c+j < 0 || r+i < 0)
                    continue;
                else if(tmpLock[r+i][c+j] == 1 && key[i][j] == 1)
                    return false;
                else if(key[i][j] == 1) 
                    tmpLock[r+i][c+j] = 1;
            }
        }

        for (let i=0; i<tmpLock.length; i++) {
            for (let j=0; j<tmpLock.length; j++) {
                if(tmpLock[i][j] == 0)
                    return false;
            }
        }

        return true;
    }
    
function rotate(key) {
    let tmpKey = JSON.parse(JSON.stringify(key));

    for(let i=0; i<key.length; i++) {
        for (let j=0; j<key.length; j++) {
            key[i][j] = tmpKey[key.length-j-1][i]
        }
    }
}
    
    return false;
}

// 구현
// 