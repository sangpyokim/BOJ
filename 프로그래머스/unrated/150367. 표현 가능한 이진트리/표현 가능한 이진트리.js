function solution(numbers) {
    var answer = [];
    
    for (let num of numbers) {
        const a = findLevel(num.toString(2))
        const res = isVal(a)
        if (res) answer.push(1)
        else answer.push(0)
    }
    return answer
}
function isVal(str) {
    const l = str.length
    if (l === 1) return true
    const root = l >>> 1
    
    const leftStr = str.slice(0, root)
    const rightStr = str.slice(root+1, l)

    if (str[root] === '0' && leftStr[leftStr.length >>> 1] == 1) return false
    else if (str[root] === '0' && rightStr[rightStr.length >>> 1] == 1) return false
    
    
    
    return isVal(leftStr) && isVal(rightStr)
}

// log n
function findLevel(str) {
        const len = str.length
        let i = 1
        let prev = 1
        while(i < len) {
            i += prev*2
            
            prev *= 2
        }
        const zero = i - len
        const temp = '0'.repeat(zero)
        return temp + str
}

// 십진수를 이진수로 변환 -> 오른쪽부터 맞추기 -> ok
// ex) 63 -> 0 + 111111
// 만들어진 문자열이 유효한지 -> 자식이 1이라면 루트도 무조껀 1이여야함