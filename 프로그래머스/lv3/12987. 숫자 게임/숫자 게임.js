function solution(A, B) {
    var answer = 0;
    A.sort((a,b) => b-a)
    B.sort((a,b) => b-a)
    
    const len = A.length
    let bIndex = 0
    for (let i = 0; i < len; i++) {
        const a = A[i]
        
        const first = B[bIndex]
        if (a >= first) continue
        bIndex += 1
        answer += 1
        // 만약에
    }  
    
    return answer;
}
// 5432, 6543