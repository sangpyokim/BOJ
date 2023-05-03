function solution(targets) {
    let answer = 0, prev = -1;
    const len = targets.length
    
    targets.sort((a, b) => a[1] - b[1])
    
    // console.log(targets)
    
    for (let i = 0; i < len; i++) {
        const [a, b] = targets[i]
        
        if (prev <= a) {
            prev = b
            answer += 1
            continue
        }
        
        
        
    }
    
    
    return answer;
}