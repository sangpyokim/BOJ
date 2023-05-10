const fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const input = fs.readFileSync(filePath).toString().trim().split("\n");

const [F, S, G, U, D] = input.shift().split(' ').map(Number)

const solution = () => {
  let q = [S], time = 0
  const dir = [U, -D]
  const isVal = x => x >= 1 && x <= F

  const set = []
  set[S] = true

  while (q.length) {
    const temp = []
    
    for (let cur of q) {
      if (cur === G) return console.log(time)

      for (let x of dir) {
        const dx = cur + x

        if (isVal(dx) && !set[dx]) {
          set[dx] = true
          temp.push(dx)
        }
      }
    }

    q = temp
    time += 1
  }

  return console.log('use the stairs')
}

solution()