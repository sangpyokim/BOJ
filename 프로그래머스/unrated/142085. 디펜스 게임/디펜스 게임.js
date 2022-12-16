function solution(n, k, enemy) {
    let left = 0, right = enemy.length
    
    while(left < right) {
        const mid = (right + left) >>> 1
        if (!isDefense(mid)) {
            right = mid
        } else {
            left = mid + 1
        }
    }
    
    function isDefense(mid) {
        const arr = enemy.slice(0, mid+1)
        arr.sort((a,b) => b-a)
        let sum = 0
        let t = k
        
        for (let i in arr) {
            const cur = arr[i]
            if (t > 0) {
                t -= 1
            } else {
                sum += cur
            }
            if (sum > n) return false;
        }
        
        return true
    }
    
    return left;
}
