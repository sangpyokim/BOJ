function solution(numbers) {
    const len = numbers.length
    var answer = new Array(len).fill(-1);
    
    const stack = []
    
    for (let i in numbers) {
        const num = numbers[i]
        
        while(stack.length && numbers[stack.at(-1)] < num ) {
            const index = stack.pop()
            
            answer[index] = num
        }
        
        stack.push(i)
    }
    
    
    
    return answer;
}