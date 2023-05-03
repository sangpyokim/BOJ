function solution(r1, r2) {
    var answer = 0;
    
    
    for (let i = 1; i < r2+1; i++) {
        const max = Math.floor(Math.sqrt(r2**2 - i**2))
        let min = 0
        if (r1 > i) min = Math.ceil(Math.sqrt(r1 ** 2 - i ** 2))
        answer += max - min + 1
    }

    
    return answer*4
}
