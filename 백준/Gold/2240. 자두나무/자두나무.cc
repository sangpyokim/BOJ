#include <iostream>
#include <algorithm>

using namespace std;
int T, W;

int list[1001];
int dp[31][2][1001];
// dp[이동횟수][현재위치][시간]

int main()
{
	std::ios::sync_with_stdio(false);
	std::cin.tie(NULL);

	// 입력
	cin >> T >> W;
	for (int i = 1; i <= T; i++)
		cin >> list[i];


	for (int j = 0; j <= W; j++)
	{
		for (int i = 1; i <= T; i++)
		{
			if (j == 0)
			{	//처음 시작시 자두는 1번 나무 아래 위치해있다.
				dp[j][0][i] = dp[j][0][i - 1] + (list[i] == 1);
			}
			else
			{
				//첫 시작 이후는, 위치 움직임or안움직임, 받음or못받음을 확인하며 체크한다.
				dp[j][0][i] = max(dp[j][0][i - 1] + (list[i] == 1), dp[j - 1][1][i - 1] + (list[i] == 1));
				dp[j][1][i] = max(dp[j][1][i - 1] + (list[i] == 2), dp[j - 1][0][i - 1] + (list[i] == 2));
				// dp[이동횟수][자두의 위치][흐른 시간] = 
				// (이동하지않고 시간만 1초 흐름 + i번째 입력과 현재 위치가 같은가?), 
				// (이동했고, 1초 흐름 + i번째 입력과 현재 위치가 같은가?) 중 큰 값
			}
		}
	}


	int ans = 0;
	for (int i = 0; i < 2; i++)
	{
		for (int j = 0; j <= W; j++)
		{
        	// 마지막에 가능한 모든 이동횟수와, 위치중 가장 큰 값을 출력한다.
			ans = max(ans, dp[j][i][T]);
		}
	}

	cout << ans << '\n';
}