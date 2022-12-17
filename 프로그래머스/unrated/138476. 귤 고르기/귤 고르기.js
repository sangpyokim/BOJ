function solution(k, tangerine) {
    var answer = 0;
    const map = new Map()
    for (let x of tangerine) {
        map.set(x, map.get(x) + 1 || 1)
    }
    const arr = []
    for (let [k, v] of map) {
        arr.push([k, v])
    }
    arr.sort((a,b) => b[1] - a[1])

    for (let [key, v] of arr) {
        k -= v
        answer += 1
        if (k <= 0) return answer
    }
    
    return answer;
}