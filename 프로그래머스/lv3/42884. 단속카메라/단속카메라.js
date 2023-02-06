function solution(routes) {
    var answer = 0;
    routes.sort((a,b) => a[0] - b[0])
    routes.sort((a,b) => a[1] - b[1])
    let cameraPos = -Infinity

    for (let [to, from] of routes) {
        if (to <= cameraPos) continue
        
        answer += 1
        cameraPos = from
    }
    return answer;
}