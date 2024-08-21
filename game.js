import chalk from 'chalk';
import readlineSync from 'readline-sync';

// 몬스터와 플레이어의 부모 클래스
class BaseStat {
  constructor(hp, attack) {
    this._hp = hp;
    this._atk = attack;
  }

  attack(target) {
    // 공격
    target.hit(this.atk);
  }

  hit(dmg) {
    // 피격
    this.hp -= dmg;
  }

  get atk() {
    return this._atk;
  }

  set atk(atk) {
    this._atk = atk;
  }

  get hp() {
    return this._hp;
  }

  set hp(hp) {
    if (hp < 0) this._hp = 0;
    else this._hp = hp;
  }
}

// player 클래스
class Player extends BaseStat {
  constructor() {
    super(100, 20);
    this._runRate = 0.4;
  }

  specialattack() {}

  heal(hp) {
    this.hp += hp;
  }

  playerClearStage(hp, atk, run) {
    this.heal(hp);
    this.atk += atk;
    this.runRate -= run;
  }

  get runRate() {
    return this._runRate;
  }

  set runRate(val) {
    if (val < 0) this._runRate = 0;
    else this._runRate = val;
  }
}

// 몬스터 클래스
class Monster extends BaseStat {
  constructor(stage) {
    let Hp = 60 + stage * 30;
    let Atk = 10 + stage * 6;
    if (stage === 10) {
      Hp *= 1.5;
      Atk *= 1.3;
    }
    super(Hp, Atk);
  }
}

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
        `\n1. 공격한다 2. 아무것도 하지않는다. 3. 도망친다(${Math.round(player.runRate * 100 * 10) / 10}%)`,
      ),
    );
    process.stdout.write(chalk.white('당신의 선택은? '));
    const choice = readlineSync.question('');

    // 플레이어의 선택에 따라 다음 행동 처리
    switch (choice) {
      case '1': // 공격
        player.attack(monster);
        logs.push(
          chalk.green(`[${turns}] 플레이어의 일반 공격! ${player.atk} 데미지를 입혔습니다!`),
        );
        break;
      case '2': // 아무것도 안한다
        logs.push(chalk.red(`[${turns}] 당신은 몬스터의 위협에 몸이 굳어 그저 가만히 서있었다.`));
        break;
      case '3': // 도망친다
        if (Math.random() <= player.runRate) {
          console.log(chalk.green(`몬스터로부터 도망치는 데 성공했습니다!`));
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
    monster.attack(player);
    logs.push(chalk.red(`[${turns}] 몬스터의 일반 공격! ${monster.atk} 데미지를 입었습니다!`));

    ++turns;

    if (monster.hp <= 0) {
      displayStatus(stage, player, monster);
      console.log(chalk.green(`플레이어의 승리!`));
      // hp 회복, 공격력 상승, 도망칠 확률 감소
      const heal = Math.floor(Math.random() * 100) + 50;
      const atkincrease = Math.floor(Math.random() * 6) + 3;
      const rundecrease = Math.round(Math.random() * 5 * 10) / 10 + 1;
      player.playerClearStage(heal, atkincrease, rundecrease / 100);

      // 스텟의 변화를 화면에 출력
      console.log(chalk.green(`HP가 ${heal}만큼 회복되었습니다.`));
      console.log(chalk.green(`공격력이 ${atkincrease}만큼 상승했습니다.`));
      console.log(chalk.red(`도망칠 확룰이 ${rundecrease}%만큼 하락했습니다.`));
      await waitSecond(1.5);
      await nextStage(3);
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
}
