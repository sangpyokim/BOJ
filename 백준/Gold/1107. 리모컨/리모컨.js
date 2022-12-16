let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');
const target = +input[0]
const N = input[1]
let set = new Set()
if (N > 0) set = new Set(input[2].split(' ').map(Number))

function check(num) {
  let str = num.toString()
  for (let char of str) {
    if (set.has(char*1)) return false
  }
  return true
}

// 초기 상태에서 +,-만 눌려서 target 도달 시 필요한 클릭 수
let min1 = Math.abs(target-100);
let min2 = Infinity;

for(let i = 0; i<=999999; i++){
  if(check(i)){
    let newMin = i.toString().length+Math.abs(target-i);
    if(newMin<min2) min2 = newMin;
    else if(newMin>min2){
      break;
    }
  }
}
console.log(Math.min(min1, min2))

