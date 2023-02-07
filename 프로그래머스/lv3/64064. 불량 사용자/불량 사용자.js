function solution(user_id, banned_id) {
    var answer = 0;
    const len = banned_id.length
    const set = new Set()
    
    function helper(L, arr, index) {
        if (L === len) {
            const key = arr.sort().join(',')
            if (!set.has(key)) set.add(key)
            return 
        }
        
        const ban = banned_id[L]
        
        for (let i = 0; i < user_id.length; i++) {
            const str = user_id[i]
            if (compareString(str, ban) && arr.findIndex(ele => ele === str) === -1) {
                helper(L+1, [...arr, str])
            }
                
        }        

    }
    
    helper(0, [])
    return set.size
}

// 일반, 불량
function compareString(str1, str2) {
    const len1 = str1.length
    const len2 = str2.length
    if (len1 !== len2) return false
    
    for (let i in str1) {
        const char1 = str1[i]
        const char2 = str2[i]
        if (char2 === '*') continue
        if (char1 !== char2) return false
    }
    
    return true
}

// 완전 탐색 dfs, 백트