# roguelike-project
셀프 코드 리뷰:

[![코드 리뷰](https://pbs.twimg.com/profile_images/1228368893321736193/Ov0og7E8_400x400.jpg)]([https://unity3d.com/kr](https://velog.io/@mwj1205/posts))

## 필수 기능 <a id="section2-1"></a>
### 첫 화면
<img src="https://velog.velcdn.com/images/mwj1205/post/012dece0-912f-4c1f-b1c2-d1defbf7764f/image.png" style="display: block; margin: 0; padding: 0;">
스켈레톤 코드로 주어진 첫 화면이다.
2번 업적과 3번 옵션은 구현되지 않았지만, 따로 빼지는 않았다.
1을 입력하면 전투 화면으로 넘어갈 수 있다.

### 전투 화면
<img src="https://velog.velcdn.com/images/mwj1205/post/46d210b2-e263-45e1-9da8-ca3208dd9118/image.png" style="display: block; margin: 0; padding: 0;">
1~6번의 선택지가 있고 플레이어는 숫자를 입력하여 원하는 행동을 할 수 있다.

### 전투 로직
<img src="https://velog.velcdn.com/images/mwj1205/post/5e0ea0f2-ecfc-4a5b-a453-0d05f4c80fa2/image.png" style="display: block; margin: 0; padding: 0;">
1을 입력해 몬스터에게 공격을 가할 수 있다.

플레이어의 공격력에 따라 데미지가 결정되며, 
플레이어의 행동이 한번 실행된 후에는 몬스터의 행동이 시작된다.

### 전투 승리
<img src="https://velog.velcdn.com/images/mwj1205/post/b99aa73d-aaa1-4949-b6ac-6a19522d8c39/image.png" style="display: block; margin: 0; padding: 0;">
몬스터의 체력을 0으로 만들면 전투에서 승리하고 다음 층으로 이동한다.

전투에서 승리하면 랜덤한 수치만큼 HP가 회복되고, 공격력이 상승한다.
스테이지가 진행될 수록 도망 성공률이 감소한다.

### 5-도망치기
<img src="https://velog.velcdn.com/images/mwj1205/post/e4406a97-9d30-476f-9e5e-85b499d07eb0/image.png" style="display: block; margin: 0; padding: 0;">
5번 도망치기를 선택하면 플레이어의 도망 수치에 따른 확률로 다음 스테이지로 즉시 이동할 수 있다. 

<img src="https://velog.velcdn.com/images/mwj1205/post/49760f87-4886-4b13-b27a-30034f643562/image.png" style="display: block; margin-bottom: 0; padding: 0;">
도망치는 데에 실패했다면 몬스터의 턴으로 넘어가 공격을 받게 된다.


## 도전 기능 <a id="section2-2"></a>
### 2-강한 공격
<img src="https://velog.velcdn.com/images/mwj1205/post/4243b971-9521-4a63-9aac-4d65879be749/image.png" style="display: block; margin: 0; padding: 0;">
2번 강공격을 선택하면 플레이어는 강한 공격을 시도한다.

플레이어의 강공격 성공 확률 스텟에 따라 성공률이 결정되고, 성공한다면 일반 공격보다 더 많은 데미지를 입힐 수 있고, 실패한다면 원래 공격력의 절반 만큼의 데미지를 입히게 된다.

### 3-방어
<img src="https://velog.velcdn.com/images/mwj1205/post/c1f8f073-6c19-41d0-9a94-3a6dc41868bb/image.png" style="display: block; margin: 0; padding: 0;">
정해진 확률에 따라 몬스터의 공격을 방어한다.

<img src="https://velog.velcdn.com/images/mwj1205/post/3cc5a1ec-e9c8-428d-a344-98a93db9c802/image.png" style="display: block; margin-bottom: 0; padding: 0;">
<img src="https://velog.velcdn.com/images/mwj1205/post/5fec605a-8e14-4ed5-9787-c0a464fed5dc/image.png" style="display: block; margin-bottom: 0; padding: 0;">

연속해서 방어를 시도하게 된다면 방어의 성공률이 절반씩 줄어들게 되고,
다른 행동을 취하면 다시 방어 성공률이 원래대로 돌아온다.

### 3-방어 후 카운터
<img src="https://velog.velcdn.com/images/mwj1205/post/96de73a2-3272-466c-9273-9f4efaf87bad/image.png" style="display: block; margin-bottom: 0; padding: 0;">
방어 성공 시 일정 확률로 몬스터에게 반격을 날린다.
반격에 성공하면 플레이어의 공격력에 일부에 해당하는 피해를 가한다.

### 스테이지 클리어 후 아이템 획득
<img src="https://velog.velcdn.com/images/mwj1205/post/8346ab78-19c5-4a9e-8eee-333822d58544/image.png" style="display: block; margin: 0; padding: 0;">
몬스터를 처치하면 여러 아이템 중 랜덤하게 3개의 아이템이 드롭된다.

플레이어는 3개의 아이템 중 1개를 선택해서 획득할 수 있다.

<img src="https://velog.velcdn.com/images/mwj1205/post/72139fe9-4ca1-4909-9d42-fb8d492bb10c/image.png" style="display: block; margin: 0; padding: 0;">
아이템을 선택하면 아이템의 설명을 확인할 수 있고. 

선택한 아이템을 획득할지, 다른 아이템을 선택할지 선택할 수 있다.
