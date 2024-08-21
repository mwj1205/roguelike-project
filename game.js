import chalk from 'chalk';
import readlineSync from 'readline-sync';

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
    if(hp < 0)
      this._hp = 0;
    else this._hp = hp;
  }
}

class Player extends BaseStat {
  constructor() {
    super(100, 20);
  }

  specialattack() {

  }

  heal() {

  }
}

class Monster extends BaseStat {
  constructor(stage) {
    let Hp = 50 + stage * 10;
    let Atk = 10 + stage * 5;
    if(stage === 10){
      Hp *= 1.5;
      Atk *= 1.3;
    }
    super(Hp, Atk);
  }
}

function displayStatus(stage, player, monster) {
  console.log(chalk.magentaBright(`\n=== Current Status ===`));
  console.log(
    chalk.cyanBright(`| Stage: ${stage} `) +
    chalk.blueBright(
      `| 플레이어 정보 HP: ${player.hp}, ATK: ${player.atk} `,
    ) +
    chalk.redBright(
      `| 몬스터 정보 HP: ${monster.hp}, ATK: ${monster.atk} |`,
    ),
  );
  console.log(chalk.magentaBright(`=====================\n`));
}

const battle = async (stage, player, monster) => {
  let logs = [];
  let turns = 0;

  while (player.hp > 0) {
    console.clear();
    displayStatus(stage, player, monster);

    logs.forEach((log) => console.log(log));

    console.log(
      chalk.green(
        `\n1. 공격한다 2. 아무것도 하지않는다.`,
      ),
    );
    process.stdout.write(chalk.white('당신의 선택은? '));
    const choice = readlineSync.question('');

    // 플레이어의 선택에 따라 다음 행동 처리
    switch (choice) {
      case '1': // 공격
        player.attack(monster);
        logs.push(chalk.green(`[${turns}] 플레이어의 일반 공격! ${player.atk} 데미지를 입혔습니다!`));
        break;
      default:
        logs.push(chalk.gray(`올바른 값을 선택해 주세요.`));
        continue;
    }

    // 몬스터 공격
    monster.attack(player);
    logs.push(chalk.red(`[${turns}] 몬스터의 일반 공격! ${monster.atk} 데미지를 입었습니다!`));

    ++turns;
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

    stage++;
  }
}