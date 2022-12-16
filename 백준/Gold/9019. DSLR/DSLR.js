let fs = require('fs');
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let input = fs.readFileSync(filePath).toString().trim().split('\n');

var idx = 0;
var testCase = parseInt(input[idx++]);
var func = [D, S, L, R];
var type = ['D', 'S', 'L', 'R'];
Array.prototype.fill = function(size, what) {
  if(what !== undefined)  while(size) this[--size] = what;
  else while(size) this[--size] = [];
}
for(var j = 0; j < testCase; j++){
  var AB = input[idx++].split(' ');
  var A = parseInt(AB[0]);
  var B = parseInt(AB[1]);
  var q = [];

  var prev = [];
  for(var i=0; i<10000; ++i) prev[i] = -1;
  prev[A] = A;
  var op = [];
  q.push(A);

  while (prev[B] === -1) {
    var cur = q.shift();
    for(var i = 0; i < 4; i++){
      var next = func[i](cur);
      if(prev[next] === -1){
        prev[next] = cur
        op[next] = type[i];
        q.push(next);
      }
    }
  }
  var stack = [];
  var cur = B;
  while (prev[cur] !== cur) {
    stack.push(op[cur]);
    cur = prev[cur];
  }
  var ans = '';
  while (stack.length) {
    ans += stack.pop();
  }
  console.log(ans);
}


function L(n) {
  return Math.floor(n * 10 % 10000 + n / 1000);
}

function R(n) {
  return Math.floor(n * 1000 % 10000 + n / 10);
}

function D(n) {
  return n * 2 % 10000;
}

function S(n) {
  return (n + 9999) % 10000;
}