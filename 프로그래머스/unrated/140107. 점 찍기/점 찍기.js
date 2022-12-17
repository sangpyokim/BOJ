function solution(k, d) {
    var answer = 0;
    let i = 0
    
    const a = d*d
    
    while(i <= d) {
        // 00 0~d
        
        const b = i*i
        const c = Math.pow(a - b, 0.5)
        
        answer += Math.floor(c / k) + 1
        
        i += k
    }
    
    
    
    return answer;
}
// 0 -> 5   5
// 1 -> 4   9
// 2 -> 4   13
// 3 -> 4   17
// 4 -> 3   20
