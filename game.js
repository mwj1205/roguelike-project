import chalk from 'chalk';
import readlineSync from 'readline-sync';
import { Player, Monster } from './classes.js';

// setTimeout 편하게 쓰기 위한 함수
function waitSecond(time) {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
}

// 다음 스테이지로 넘어갈 때 time초 만큼 기다리고 넘어감.
async function nextStage(time) {
  for (let i = time; i > 0; i--) {
    console.log(chalk.magentaBright(`${i}초 뒤 다음 스테이지로 이동합니다.`));
    await waitSecond(1);
  }
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
      chalk.blueBright(`| 플레이어 정보 HP: ${player.hp}, ATK: ${player.atk} `) +
      chalk.redBright(`| 몬스터 정보 HP: ${monster.hp}, ATK: ${monster.atk} |`),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];
  let turns = 1;

  while (player.hp > 0 && monster.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);
    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 강공격(${Math.round(player.criticalRate * 100 * 10) / 10}%) 3. 아무것도 하지않는다. 4. 도망친다(${Math.round(player.runRate * 100 * 10) / 10}%)`,
      ),
    );
    process.stdout.write(chalk.white('당신의 선택은? '));
    const choice = readlineSync.question('');

    // 플레이어의 선택에 따라 다음 행동 처리
    switch (choice) {
      case '1':
        // 공격
        const dmg = player.attack(monster, 0);
        logs.push(chalk.green(`[${turns}] 플레이어의 일반 공격! ${dmg} 데미지를 입혔습니다!`));
        break;
      case '2':
        // 강공격
        if (Math.random() <= player.criticalRate) {
          // 플레이어의 크리티컬 확률보다 낮으면 성공
          const dmg = player.attack(monster, 1);
          logs.push(chalk.green(`[${turns}] 플레이어의 강공격 성공! ${dmg} 데미지를 입혔습니다!`));
        } else {
          const dmg = player.attack(monster, -1);
          logs.push(
            chalk.green(`[${turns}] 플레이어의 강공격 실패! ${dmg} 데미지를 입혔습니다...`),
          );
        }
        break;
      case '3':
        // 아무것도 안한다
        logs.push(chalk.red(`[${turns}] 당신은 몬스터의 위협에 몸이 굳어 그저 가만히 서있었다.`));
        break;
      case '4':
        // 도망친다
        if (Math.random() <= player.runRate) {
          console.log(chalk.green(`몬스터로부터 도망치는 데 성공했습니다!`));
          player.isRan = true;
          await nextStage(3);
          return; // 도망으로는 스텟이 오르지 않음
        } else {
          logs.push(chalk.red(`[${turns}] 도망치는 데 실패했습니다!`));
        }
        break;
      default:
        logs.push(chalk.gray(`올바른 값을 선택해 주세요.`));
        continue;
    }

    // 몬스터 공격
    if (monster.hp > 0) {
      if (Math.random() < monster.criticalRate) {
        const dmg = monster.attack(player, 0);
        logs.push(chalk.red(`[${turns}] 몬스터의 일반 공격! ${dmg} 데미지를 입었습니다!`));
      } else {
        const dmg = monster.attack(player, 1);
        logs.push(chalk.red(`[${turns}] 몬스터의 강공격! ${dmg} 데미지를 입었습니다!`));
      }
    }

    ++turns;

    if (monster.hp <= 0) {
      console.clear();
      displayStatus(stage, player, monster);
      logs.forEach((log) => console.log(log));
      console.log(chalk.green(`\n플레이어의 승리!`));

      if (stage < 10) {
        // 스테이지 클리어에 따른 플레이어 스탯 변화
        player.playerClearStage();

        await waitSecond(1.5);
        //await nextStage(3);
      }
      return;
    }
  }
};

export async function startGame() {
  console.clear();
  const player = new Player();
  let stage = 1;

  while (stage <= 10) {
    const monster = new Monster(stage);
    await battle(stage, player, monster);

    // 스테이지 클리어 및 게임 종료 조건
    if (player.hp <= 0) {
      console.log(chalk.red(`당신은 패배했다...`));
      return;
    }

    stage++;
  }

  // 승리
  if (stage >= 10) {
    console.log(chalk.green(`당신은 던전을 완전 정복하고 용사가 되었습니다!`));
    if (player.isRan)
      console.log(chalk.green(`...어쩌면 그저 던전에서 도망쳐 나온 겁쟁이뿐일지도 모르죠`));
  }
}
