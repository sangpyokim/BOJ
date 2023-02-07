function solution(sticker) {
    if (sticker.length === 1) return sticker[0]
    var answer = 0;
    const len = sticker.length
    
    function helper(arr) {
        const dp = []
        dp[0] = arr[0]
        dp[1] = arr[1]
        for (let i = 2; i < arr.length; i++) {
            dp[i] = Math.max(arr[i] + dp[i-2], dp[i-1])
        }
        return dp[dp.length-1]
    }
    const temp = [...sticker]
    const a = temp.pop()
    const arr1 = [0].concat([...temp])
    temp.push(a)
    temp[0] = 0
    const prev = helper(arr1)
    const cur = helper(temp)
    return Math.max(prev, cur)
}
// dp