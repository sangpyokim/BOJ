function solution(sequence, k) {
    var answer = [];
    let sum = 0, left = 0, right = 0, maxLen = Infinity
    for (let i in sequence) {
        const num = sequence[i]
        
        sum += num
        
        while (sum > k) {
            sum -= sequence[left]
            left += 1
        }
        
        if (sum === k) {
            right = i*1
            if (maxLen > (right - left +1)) {
                maxLen = right - left + 1
                answer = [left, right]
            }
        }
    }
    
    return answer;
}