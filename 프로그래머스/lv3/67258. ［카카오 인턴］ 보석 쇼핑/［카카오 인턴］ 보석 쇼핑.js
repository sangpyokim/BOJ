function solution(gems) {
    var answer = [0, 0];
    const set = new Set(gems)
    let maxLen = Infinity
    
    const bag = new Map()
    let left = 0
    for (let right in gems) {
        const gem = gems[right]
        bag.set(gem, bag.get(gem) + 1 || 1)
        
        while(bag.size === set.size) {
            const len = right - left + 1
            if (maxLen > len) {
                maxLen = len
                answer = [left+1, right*1 +1]
            }
            
            const leftGem = gems[left]
            const a = bag.get(leftGem)
            
            if (a === 1) bag.delete(leftGem)
            else bag.set(leftGem, a-1)
            
            left+=1
        }
    }
    
    return answer;
}

// 슬라이딩 윈도우~