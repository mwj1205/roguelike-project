# roguelike-project
 내일배움캠프 Node.js 6기 개인과제 텍스트 로그라이크 게임

첫 화면
 첫 화면에서 1. 새 게임, 2. 업적, 3. 옵션, 4. 게임 종료 선택
 2 업적, 3 옵션은 미구현
 1 새 게임을 선택하면 게임 시작
 4 게임 종료를 선택하면 게임이 정상적으로 종료

1. 기획
 기본적인 진행
 스테이지마다 플레이어와 몬스터의 배틀
 플레이어 또는 몬스터가 쓰러질 때 까지 스테이지가 진행
 스테이지가 진행될수록 몬스터의 체력과 공격력이 증가함
 플레이어의 Hp가 0이 되면 게임 종료
 총 10 스테이지를 클리어 하면 플레이어의 승리
 마지막 10 스테이지의 몬스터는 이전에 나왔던 몬스터보다 높은 스텟을 가지고있음

2. 전투 진행
 플레이어와 몬스터가 번갈아 가면서 공격
 플레이어 턴에 플레이어는 일반 공격, 특수공격, 방어, 도망 4개의 선택지 중 1개를 선택
 공격: 플레이어의 공격력만큼의 데미지를 주는 공격 실행
 특수 공격: 정해진 확률에 따라 일반 공격의 2배 데미지 // 기획: 항상 45%
 방어: 정해진 확률에 따라 다음 몬스터의 공격을 무효화 // 기획: 처음에는 50%, 연속해서 사용할 경우 확률이 계속해서 반으로 25, 12, 6...으로 줄어듦 다른 행동을 하면 다시 50%로 복귀됨.
 도망: 정해진 확률에 따라 전투에서 즉시 승리 // 기획: 기본 2%, 플레이어가 선택한 선택지에 따라 확률 상승. 10스테이지(보스)에서는 도망 불가
 (도전) 아이템: 획득한 아이템을 사용

3. 전투 승리
 몬스터의 Hp가 0이 되면 플레이어의 스텟이 랜덤으로 상승, hp도 일정량 회복됨.
 /* (도전) 
 도전1. 3개의 선택지를 주고 플레이어가 원하는 스탯을 상승
 생각나는 것 : 현재 hp 회복, 공격력 상승, 도망 확률 ...정도 밖에 없는데 수치를 랜덤으로 주는 것도 괜찮을 듯

 도전2. 스텟은 기본으로 상승시켜주고, 전투에 유용한 아이템을 주는 것도 좋아보임
 포션, 큰 데미지를 주는 아이템, 일정 턴(또는 다음 스테이지)동안 공격력이 증가하는 물약, 영구히 특수공격 확률이 올라가는 물약 등등

 도전3. 일정 확률로 큰 보상 획득
 대략 10%의 확률로 스텟이 크게 오르는 보상 획득
 */
 스텟이 상승한 후(선택지를 고른 후) 다음 스테이지로 이동

4. 전투 패배
 플레이어의 Hp가 0이 되면 플레이어의 패배.
 플레이어가 패배했다는 문구 출력 후 첫 화면으로 이동.
