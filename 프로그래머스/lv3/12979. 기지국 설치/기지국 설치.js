function solution(n, stations, w) {
    var answer = 0;
    let prev = 0
    const p = w*2 +1
    for (let i in stations) {
        const station = stations[i] - w // index
        // 첫번째  w보다 크면 차이 계산 후
        const prevRightRange = i == 0 ? 0 : prev+w
        
        const emptyRange = station - prevRightRange-1
        
        
        answer += Math.ceil( emptyRange / p)
        
        prev = station+w
    }
    
    const station = stations[stations.length-1] + w 

    answer += Math.ceil((n - station) / p)
    

    return answer;
}

// 2억... 이진탐색?
// station 기준 -> 왼쪽 오른쪽 확인.