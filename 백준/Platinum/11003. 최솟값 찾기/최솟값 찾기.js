class Deque {
  constructor() {
    this.arr = [];
    this.head = 0;
    this.tail = 0;
  }
  push_front(item) {
    if (this.arr[0]) {
      for (let i = this.arr.length; i > 0; i--) {
        this.arr[i] = this.arr[i - 1];
      }
    }
    this.arr[this.head] = item;
    this.tail++;
  }
  push_back(item) {
    this.arr[this.tail++] = item;
  }
  pop_front() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[this.head++];
      return result;
    }
  }
  pop_back() {
    if (this.head >= this.tail) {
      return null;
    } else {
      const result = this.arr[--this.tail];
      return result;
    }
  }
  isEmpty() {
    return this.head >= this.tail
  }
}

const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, L] = input.shift().split(' ').map(Number)
const arr = input.shift().split(' ').map(Number)

let answer = ''
const deque = new Deque()

for (let i = 0; i < N; i++) {
  if (!deque.isEmpty() && deque.arr[deque.head][1] < i - L + 1) {
    deque.pop_front()
  }
  const x = arr[i]
  
  while (!deque.isEmpty() && deque.arr[deque.tail - 1][0] > x) {
    deque.pop_back()
  }

  deque.push_back([x, i])
    
    answer += deque.arr[deque.head][0] + ' '

    if (i % 10000 === 0) {
        process.stdout.write(answer);
        answer = '';
    }
    
    
}


console.log(answer.trimEnd())
