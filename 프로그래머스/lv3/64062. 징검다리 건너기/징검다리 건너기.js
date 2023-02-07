function solution(stones, k) {
    let answer = Infinity
    const stack = []
    let index = 0
    for (let i in stones) {
        // 스택의 마지막 요소가 현재 요소보다 작다면 팝
        // 내림차순
        i = i*1
        
        while(stack.length > index && stones[stack[stack.length-1]] < stones[i]) {
            stack.pop()
        }
        
        stack.push(i)
        if (stack[index] === i - k) {
            index += 1
        }
        if (i >= k-1) answer = Math.min(answer, stones[stack[index]])
    }
    
    return answer
}

// 그리디, 투포, 슬라이딩 윈도우