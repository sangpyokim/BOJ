function solution(picks, minerals) {
    let answer = Infinity;
    // picks의 조합으로 미네랄 캐기~
    let len = 0
    for (let i in picks) {
        len += picks[i]
    }
    const heal = [[1,1,1],[5,1,1],[25,5,1]]
    
    helper(0, [])
    
    // 백트레킹
    function helper(L, A) {
        if (L === len) {
            let i = 0, use = 0, h = 0
            
            for (let name of minerals) {
                const a = A[i]
                if (i === A.length) break;
                
                let b
                if (name === 'diamond') b = 0
                else if (name === 'iron') b = 1
                else b = 2

                h += heal[a][b] 
                if (h >= answer) break;
                
                use += 1
                if (use === 5) {
                    i += 1
                    use = 0
                }
            }

            return answer = Math.min(answer, h)
        }
        
        for (let i in picks) {
            const v = picks[i]
            if (v > 0) {
                picks[i] -= 1
                helper(L+1, [...A, i*1])
                picks[i] += 1
            }
        }
    }
    
    
    
    return answer;
}