const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [N, M] = input.shift().split(' ').map(str => str.split(''))
// let A = input.map(l => l.split(' ').map(Number))


const solution = () => {
    let answer = 0, set = new Set()
    const target = M.join(''), len = N.length


    helper(0, '')

    console.log(answer === 0 ? -1 : answer)

    function helper(L, str) {
        if (L === len) {
            if (str[0] != 0 && str*1 < target*1) answer = Math.max(answer, str)
            return
        }

        for (let i = 0; i < len; i++) {
            if (!set.has(i)) {
                set.add(i)
                helper(L + 1, str + String(N[i]))
                set.delete(i)
            }
        }


    }
}

solution()