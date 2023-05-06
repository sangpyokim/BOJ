function solution(sequence) {
    var answer = 0;
    
    const arr1 = [], arr2 = []
    
    let trig = true
    for (let i in sequence) {
        if (trig) {
            arr1[i] = sequence[i]
        } else {
            arr1[i] = -sequence[i]
        }
        trig = !trig
    }
    
    trig = false
    for (let i in sequence) {
        if (trig) {
            arr2[i] = sequence[i]
        } else {
            arr2[i] = -sequence[i]
        }
        trig = !trig
    }
    
    const res1 = temp(arr1)
    const res2 = temp(arr2)
    return Math.max(res1, res2)
}

function temp(arr) {
    let sum = 0, max = 0
    
    for (let i in arr) {
        sum += arr[i]
        
        if (sum < arr[i]) {
            sum = arr[i]
        }
        
        max = Math.max(max, sum)
    }
    
    return max
}