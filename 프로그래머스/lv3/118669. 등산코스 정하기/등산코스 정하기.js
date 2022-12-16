class Heap {
    constructor() {
      this.items = [];
    }

    swap(idx1, idx2) {
      [this.items[idx1], this.items[idx2]] = [this.items[idx2], this.items[idx1]];
    }

    findParentIdx(idx) {
      return Math.floor((idx - 1) / 2);
    }

    findLeftChildIdx(idx) {
      return idx * 2 + 1;
    }

    findRightChildIdx(idx) {
      return idx * 2 + 2;
    }

    findParent(idx) {
      return this.items[this.findParentIdx(idx)];
    }

    findLeftChild(idx) {
      return this.items[this.findLeftChildIdx(idx)];
    }

    findRightChild(idx) {
      return this.items[this.findRightChildIdx(idx)];
    }

    size() {
      return this.items.length;
    }
  }

  class MinHeap extends Heap {
    bubbleUp() {
      let index = this.items.length - 1;

      while (this.findParent(index) && this.findParent(index)[1] > this.items[index][1]) {
        this.swap(index, this.findParentIdx(index));
        index = this.findParentIdx(index);
      }
    }

    bubbleDown() {
      let index = 0;

      while (
        (this.findLeftChild(index) && this.findLeftChild(index)[1] < this.items[index][1]) ||
        (this.findRightChild(index) && this.findRightChild(index)[1] < this.items[index][1])
      ) {
        let smallerIndex = this.findLeftChildIdx(index);

        if (
          this.findRightChild(index) &&
          this.findRightChild(index)[1] < this.items[smallerIndex][1]
        ) {
          smallerIndex = this.findRightChildIdx(index);
        }

        this.swap(index, smallerIndex);
        index = smallerIndex;
      }
    }

    add(value) {
      this.items.push(value);
      this.bubbleUp();
    }

    poll() {
      if (this.size() === 1) {
        return this.items.pop();
      }

      const value = this.items[0];
      this.items[0] = this.items.pop();
      this.bubbleDown();

      return value;
    }
  }

  function solution(n, paths, gates, summits) {
    const MAX = 10000001;
    const answer = [n, MAX];
    const hikingTrail = Array.from({ length: n + 1 }, () => []);
    const isSummits = Array.from({ length: n + 1 }, () => false);
    summits.sort((a, b) => a - b);

    summits.forEach((summit)=>{
        isSummits[summit] = true;
    });

    paths.forEach((path) => {
      const [i, j, w] = path;

      hikingTrail[i].push([j, w]);
      hikingTrail[j].push([i, w]);
    });

    function dijkstra() {
      const minHeap = new MinHeap();
      const intensity = Array(n + 1).fill(MAX);
      gates.forEach((gate) => {
        minHeap.add([gate, 0]);
        intensity[gate] = 0;
      });

      while (minHeap.size()) {
        const [vertex, cost] = minHeap.poll();

        if (intensity[vertex] < cost) {
          continue;
        }

        if (isSummits[vertex]) {
          continue;
        }

        const adjList = hikingTrail[vertex];
        const adjListLen = adjList.length;

        for (let i = 0; i < adjListLen; i++) {
          const [nextVertex, nextCost] = adjList[i];

          if (intensity[nextVertex] > Math.max(intensity[vertex], nextCost)) {
            intensity[nextVertex] = Math.max(intensity[vertex], nextCost);
            minHeap.add([nextVertex, intensity[nextVertex]]);
          }
        }
      }

      return intensity;
    }

    const intensity = dijkstra();

    summits.forEach((summit) => {
      if (intensity[summit] < answer[1]) {
        answer[0] = summit;
        answer[1] = intensity[summit];
      }
    });

    return answer;
  }