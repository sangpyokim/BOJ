const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const N = +input.shift()
// let list = input.shift().split(' ').map(Number)


const solution = () => {
  helper(N, 0, 0)

  function helper(n, k, count) {
    let len = 2 * count + k + 3

    if (n <= len) {
      if (n === count + 1) {        
        console.log("m");
        process.exit()
      }
      else if ((n > count + 1) && (n <= count + k + 3)) {
        console.log("o");
        process.exit()
      }
      else {
        helper(n - count - k - 3, 0, 0);
      }
    }
    else helper(n, k+1, len);
  }
}



solution()

// 1 4 8 11