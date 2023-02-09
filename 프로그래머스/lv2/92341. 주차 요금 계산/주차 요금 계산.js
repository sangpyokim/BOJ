function solution(fees, records) {
    var answer = [];

    const record = new Map()
    const map = new Map()

    for (let arr of records) {
        const [time, num, inOut] = arr.split(' ')
        if (inOut === 'IN') map.set(num, time)
        else {
            // 사용시간 누적
            const t1 = transtime(time)
            const t2 = transtime(map.get(num))
            const t3 = t1 - t2
            if (record.has(num)) record.set(num, record.get(num) + t3)
            else record.set(num, t3)
            map.delete(num)
        }
    }

    for (let [num, time] of map) {
        const t1 = transtime("23:59")
        const t2 = transtime(time)
        const t3 = t1 - t2
        record.set(num, record.get(num) + t3 || t3)
    }
    
    const res = []
    for (let [num, cost] of record) {
        const fee = feeCal(cost)
        res.push([num, fee])
    }
    
    res.sort((a,b) => a[0] - b[0])
    
    for (let [n, c] of res) {
        answer.push(c)
    }
    
    return answer;
    
    
    function feeCal(cost) {
        let res = fees[1] // 기본요금 
        const t4 = cost - fees[0]
        if (t4 <= 0) return res
        
        const a = Math.ceil((t4 / fees[2]))  * fees[3]
  
        return res + a
    }
    
    function transtime(str) {
        const [hours, mins] = str.split(':').map(Number)
        return hours*60 + mins
    }
}