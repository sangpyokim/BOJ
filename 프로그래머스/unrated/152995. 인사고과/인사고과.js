function solution(scores) {
    let wanHo = scores[0]

    scores.sort((a,b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0])
    
    let answer = 1, maxScore = 0, wanHoSum = wanHo[0] + wanHo[1]
    
    for (let [a, b] of scores) {
        if (b < maxScore) {
            if (a === wanHo[0] && b === wanHo[1]) return -1
        } else {
            maxScore = Math.max(maxScore, b)
            if (a + b > wanHoSum) answer += 1
        }
    }
    
    return answer
}
