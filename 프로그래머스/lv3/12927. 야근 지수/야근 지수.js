class PriorityQ {
    constructor(asc = false) { //Min heap true, Max heap false
        this.arr = new Array();
        this.arr.push('');
        this.asc = asc;
    }

    _compare(a, b){
        if (this.asc) {
            return a < b;
        } else {
            return a > b;
        }
    }

    _compareEq(a, b){
        if (this.asc) {
            return a <= b;
        } else {
            return a >= b;
        }
    }

    push(cost, elem) {
        this.arr.push([cost, elem]);
        let curPosition = this.arr.length-1;

        while (1 < curPosition && this._compare(this.arr[curPosition][0], this.arr[Math.floor(curPosition / 2)][0]) ) {
            let tmp = this.arr[Math.floor(curPosition / 2)];
            this.arr[Math.floor(curPosition / 2)] = this.arr[curPosition];
            this.arr[curPosition] = tmp;
            curPosition = Math.floor(curPosition / 2);
        }
    }

    pop(){
        if(this.arr.length <= 1) return null;
        let curPosition = 1;
        let last = this.arr[curPosition];
        if(2 < this.arr.length) this.arr[curPosition] = this.arr.pop();
        else this.arr.pop();

        while (curPosition * 2 < this.arr.length) {
            if (curPosition * 2 + 1 < this.arr.length && this._compareEq(this.arr[curPosition * 2 + 1][0], this.arr[curPosition * 2][0]) && this._compare(this.arr[curPosition * 2 + 1][0],this.arr[curPosition][0])) { //양쪽이 있고 왼쪽이 작을 경우
                let tmp = this.arr[curPosition * 2 + 1];
                this.arr[curPosition * 2 + 1] = this.arr[curPosition];
                this.arr[curPosition] = tmp;
                curPosition = curPosition * 2 + 1;
            } else if (this._compare(this.arr[curPosition * 2][0],this.arr[curPosition][0])){
                let tmp = this.arr[curPosition * 2];
                this.arr[curPosition * 2] = this.arr[curPosition];
                this.arr[curPosition] = tmp;
                curPosition = curPosition * 2;
            } else {
                break;
            }
        }

        return last;
    }
}
function solution(n, works) {
    var answer = 0;
    const pq = new PriorityQ()
    for (let work of works) {
        if (work > 0) pq.push(work, work)
    }

    for (let i = 0 ; i < n; i++) {
        if (pq.arr.length <= 1) continue
        const ele = pq.pop()
        if (ele[0] - 1 === 0) continue 
        pq.push(ele[0]-1, ele[0]-1)
    }
    
    while(pq.arr.length > 1) {
        const ele = pq.pop()
        answer += ele[0]*ele[0]
    }
    
    return answer;
}
// 피로도 = 야근시간 ^ 업무시간
// 

// 우선순위큐~