// const fs = require('fs');
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
// const input = fs.readFileSync(filePath).toString().trim().split("\n");

// const [N, M] = input.shift().split(' ').map(Number)
// const list = input.map(l => l.split(' ').map(Number))

const solution = (N, M, list) => {
    const par = Array.from({ length: N + 1 }, (_, i) => i)
    const find = (x) => x === par[x] ? x : par[x] = find(par[x])
    const union = (x, y) => {
        if (x > y) return union(y, x)
        x = find(x)
        y = find(y)

        par[y] = x
    }
    let answer = ''
    for (let [x, y, z] of list) {
        if (x === 0) union(y, z)
        else if (x === 1) {
            if (find(y) === find(z)) answer += 'YES' + '\n'
            else answer += 'NO' + '\n'
        }
    }

    console.log(answer.trim())
}



const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
    input.push(line)
})
  .on('close', function () {
    const [N, M] = input.shift().split(' ').map(Number)
    const list = input.map(l => l.split(' ').map(Number))
    solution(N, M, list)
      

    process.exit();
});