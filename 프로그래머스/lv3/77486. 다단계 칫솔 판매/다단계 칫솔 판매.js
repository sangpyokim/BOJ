
function solution(enroll, referral, seller, amount) {
    var answer = [];
    const len = enroll.length
    
    const graph = {} // 올라가기 
    const earn = {
        center: 0
    }
    
    for (let i in enroll) {
        const name = enroll[i]
        let par = referral[i]
        
        if (par === '-') par = 'center'

        graph[name] = par
        earn[name] = 0
    }
    
    for (let i in seller) {
        const sellr = seller[i]
        const amout = amount[i]
        // map.set(sellr, map.get(sellr) + amout*100 || amout*100)
        bottomUp(sellr, amout*100)
    }
    
    function bottomUp(n, e) {
        let q = [[n, e]]
        // graph로 타고타고 올라가고
        // earn에 90% 적립, 10는 q에 넣기
        while(q.length) {
            const temp = []
            
            for (let [name, earning] of q) {
                if (earning < 10) {
                    earn[name] += earning
                    return
                }
                

                
                const parent = graph[name]
                if (!parent) {
                    earn[name] += earning
                    return
                }
                const myEarn = Math.ceil(earning / 10 * 9)
                earn[name] += myEarn
                const parentEarn = earning - myEarn
                
                temp.push([parent, parentEarn])
            }
            
            q = temp
        }
        
    }
    
    for (let name of enroll) {
        answer.push(earn[name])
    }
    
    
    return answer;
}
// N^2
// 10원 이상일 경우에만 위로 전달