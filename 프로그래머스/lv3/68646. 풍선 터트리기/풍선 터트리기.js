function solution(a) {
    let result = 0
    let min = Infinity
    for (let x of a) min = Math.min(x, min)
  const minIdx = a.indexOf(min);
  let myMinArr = new Array(a.length).fill(Infinity);

  leftInit(myMinArr, minIdx);
  rightInit(myMinArr, minIdx);

  for (let i = 0; i < a.length; i++) {
    if (i < minIdx) {
      a[i] <= myMinArr[i] && result++;
    } else if (i > minIdx) {
      a[i] <= myMinArr[i] && result++;
    } else {
      result++;
    }
  }

  return result;

  function leftInit(myMinArr, minIdx) {
    let curMin = a[0];

    for (let i = 0; i < minIdx; i++) {
      curMin = Math.min(curMin, a[i]);
      myMinArr[i] = curMin;
    }
  }
  function rightInit(myMinArr, minIdx) {
    let curMin = a[a.length - 1];

    for (let i = a.length - 1; i > minIdx; i--) {
      curMin = Math.min(curMin, a[i]);
      myMinArr[i] = curMin;
    }
  }
}
// n log n, 이진탐색?