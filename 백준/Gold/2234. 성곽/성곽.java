import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {

    static class Point{
        int y, x;
        public Point(int yy, int xx){
            y=yy;
            x=xx;
        }
    }
    static int r, c;
    static int[] Y = {0, -1, 0, 1}, X = {-1, 0, 1, 0}, size = new int[2501];
    static int[][] map = new int[51][51], room = new int[51][51];
    static boolean[][] visit = new boolean[51][51];

    static int BFS_(int yy, int xx){
        int maxSize = 0, roomNum = room[yy][xx], roomSize = size[room[yy][xx]];

        Queue<Point> Q = new LinkedList<>();
        visit[yy][xx] = true;
        Q.add(new Point(yy, xx));

        while(!Q.isEmpty()){
            Point p = Q.poll();
            int y = p.y;
            int x = p.x;

            for(int a=0; a<4; a++){
                int ny = y+Y[a];
                int nx = x+X[a];

                if(ny < 1 || nx < 1 || ny > r || nx > c || visit[ny][nx]) continue;

                if(room[ny][nx] != roomNum){
                    maxSize = Math.max(maxSize, size[room[ny][nx]] + roomSize);
                    continue;
                }

                visit[ny][nx] = true;
                Q.add(new Point(ny, nx));
            }
        }
        return maxSize;
    }
    static void BFS(int yy, int xx, int div){

        int count = 1;
        Queue<Point> Q = new LinkedList<>();

        visit[yy][xx] = true;
        room[yy][xx] = div;
        Q.add(new Point(yy, xx));

        while(!Q.isEmpty()){
            Point p = Q.poll();
            int y = p.y;
            int x = p.x;

            for(int a=0; a<4; a++){
                int ny = y+Y[a];
                int nx = x+X[a];

                if(ny < 1 || nx < 1 || ny > r || nx > c || visit[ny][nx] || (map[y][x] & (1 << a)) != 0) continue;

                count++;
                visit[ny][nx] = true;
                room[ny][nx] = div;
                Q.add(new Point(ny, nx));
            }
        }
        size[div] = count; //div번 방의 넓이
    }
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        c = Integer.parseInt(st.nextToken());
        r = Integer.parseInt(st.nextToken());

        for(int i=1; i<=r; i++){
            st = new StringTokenizer(br.readLine());
            for(int j=1; j<=c; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int div = 0;
        for(int i=1; i<=r; i++)
            for(int j=1; j<=c; j++)
                if(!visit[i][j])
                    BFS(i, j, div++);

        int max = 0;
        for(int i=0; i<=250; i++)
            if(size[i] != 0)
                max = Math.max(max, size[i]);

        boolean[] check = new boolean[div];
        int maxSize = 0;

        for(int i=1; i<=r; i++)
            for(int j=1; j<=c; j++){
                int roomNum = room[i][j];

                if(!check[roomNum]){
                    visit = new boolean[51][51];
                    check[roomNum] = true;
                    maxSize = Math.max(BFS_(i, j), maxSize);
                }
            }

        System.out.println(div);
        System.out.println(max);
        System.out.println(maxSize);
    }
}