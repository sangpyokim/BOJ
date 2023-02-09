function solution(n, k) {
    var answer = 0;
    const num = transDe(n, k)

    const len = num.length
    for (let i = 0; i < len; i++) {
        let str = ''
        for (let j = i; j < len; j++) {
            if (num[j] == 0) break
            
            str += num[j]
            if (isPrime(str*1)) {
                if (num[i-1] == 0 && num[j+1] == 0) answer += 1
                else if (num[j+1] == 0 && !num[i-1]) answer += 1
                else if (num[i-1] == 0 && !num[j+1]) answer += 1
                else if (!num[i-1]&& !num[j+1]) answer += 1
        
            }
            
        }
        
    }

    
    return answer;
}
function isPrime(num) {
    if (num === 1) return false
    
    let res = true
    for (let i = 2; i*i <= num; i++) {
        if (num % i === 0) return false
    }
    
    return res
}

function transDe(n, k) {
    let res = ''
    
    while(n > 0) {
        res += String(n % k)
        n -= n%k
        n /= k
    }
    
    return res.split('').reverse().join('')
}