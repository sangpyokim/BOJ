function solution(id_list, report, k) {
    var answer = [];
    const ban = new Map()
    const map = new Map()
    for (let str of report) {
        const [a, b] = str.split(' ')
        if (ban.has(a)) {
            const set = ban.get(a)
            ban.set(a, set.add(b))
        }
        else ban.set(a, new Set().add(b))
    }
    
    for (let [k, v] of ban) {
        for (let name of v) {
            map.set(name, map.get(name) + 1 || 1)
        }
    }
    
    const a = new Set() // 정지리스트
    for (let [key, v] of map) {
        if (v >= k) a.add(key)
    }
    
    const temp = new Map()
    for (let [key, val] of ban) {
        let count = 0
        for (let name of val) {
            if (a.has(name)) count += 1
        }
        temp.set(key, count)
    }
    for (let i in id_list) {
        const name = id_list[i]
        // console.log(name)
        if (temp.has(name)) answer[i] = temp.get(name)
        else answer[i] = 0
    }    
    return answer;
}