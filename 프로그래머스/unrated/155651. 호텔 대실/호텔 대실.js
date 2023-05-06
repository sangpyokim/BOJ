const solution = (book_time) => {
    // 입실, 퇴실 시간을 담을 이차원 배열
    let arr = [];
    // 시간을 분으로 계산
    const getTime = (value) => {
      const [h, m] = value.split(':');
      return +h * 60 + +m;
    };

    // 시간을 분으로 계산
    //  ex ) [ "14:20", "15:20" ] => [ 860, 920 ]
    book_time.map((v) => v.map((v2) => getTime(v2)))

      // 손님의 입실 시간이 빠른 순부터 오름차순
      .sort((a, b) => a[0] - b[0])
      .map((v) => {
        // arr의 길이가 0이면 0번째 인덱스에 v 추가
        // ex ) arr = [ [ 860, 920 ] ]
        if (arr.length === 0) return arr.push(v);

        // arr의 길이만큼 반복
        for (let a = 0; a <= arr.length; a++) {

          // arr의 a번째 배열의 마지막 요소에 10을 더한 값이 v의 0번째 값보다 같거나 작으면 arr의 a번째 배열에 v 추가
          // ex ) arr[a] = [ 860, 920 ] ,  v = [ 940, 1000 ]  => arr[a] = [ 860, 920, 940, 1000 ]
          if (arr[a][arr[a].length - 1] + 10 <= v[0]) return arr[a].push(...v);

          // arr의 마지막 요소까지 왔을 때까지 위 조건문에 해당되지 않았다면 arr에 새로 요소 추가
          // ex ) arr = [ [ 860, 920, 940, 1000 ], [960, 1100] ], v = [ 970, 980 ] => 
          // arr = [ [ 860, 920, 940, 1000 ], [960, 1100], [ 970, 980 ] ]
          if (!arr[a + 1]) return arr.push(v);
        }
      });

    // arr의 길이를 리턴
    return arr.length;
  };