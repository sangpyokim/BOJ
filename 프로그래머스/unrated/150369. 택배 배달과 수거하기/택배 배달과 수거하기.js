function solution(cap, n, D, P) {
    let answer = 0;
    const done = new Set()
    
    
    let pos = 0, d = 0, p = 0
    
    
    // 한칸씩이동하기
    for (let i = n-1; i >= 0; i--) {
        if (D[i] === 0 && P[i] === 0) continue

        let cnt = 0;
        while(d < D[i] || p < P[i]) {
            cnt += 1;
            d += cap;
            p += cap;
        }

        d -= D[i];
        p -=  P[i];
        
        answer = answer + (i+1) * cnt * 2;
    }

    
    return answer;
}
