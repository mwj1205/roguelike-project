import chalk from 'chalk';

// 몬스터와 플레이어의 부모 클래스
class BaseStat {
  constructor(hp, attack, criticalRate, criticalDamage) {
    this._hp = hp;
    this._atk = attack;
    this._criticalRate = criticalRate;
    this._criticalDamage = criticalDamage;
  }

  attack(target, iscrit) {
    // 공격
    // iscrit -1: 강공격 실패, 0: 기본 공격, 1: 강공격 성공
    const maxdmg = this.atk * 1.2;
    const mindmg = this.atk * 0.8;
    const randomdmg = Math.random() * (maxdmg - mindmg) + mindmg;
    let finaldmg = 0;
    switch (iscrit) {
      case -1:
        finaldmg = Math.floor(randomdmg * 0.5);
        break;
      case 0:
        finaldmg = Math.round(randomdmg);
        break;
      case 1:
        finaldmg = Math.round(randomdmg * this.criticalDamage);
        break;
      default:
        console.log('문제가 생겼습니다.');
    }
    target.hit(finaldmg);
    return finaldmg;
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

  get criticalRate() {
    return this._criticalRate;
  }

  set criticalRate(crit) {
    this._criticalRate = crit;
  }

  get criticalDamage() {
    return this._criticalDamage;
  }

  set criticalDamage(critdmg) {
    this._criticalDamage = critdmg;
  }
}

// player 클래스
export class Player extends BaseStat {
  constructor() {
    super(100, 20, 0.45, 2);
    this._runRate = 0.4;
    this._isRan = false;
  }

  playerClearStage() {
    // 스테이지를 클리어했을 때 받는 보너스 스텟
    const heal = Math.floor(Math.random() * 100) + 50;
    const atkincrease = Math.floor(Math.random() * 6) + 3;
    const rundecrease = Math.round(Math.random() * 5 * 10) / 10 + 1;

    this.hp += heal;
    this.atk += atkincrease;
    this.runRate -= rundecrease / 100;

    console.log(chalk.green(`HP가 ${heal}만큼 회복되었습니다.`));
    console.log(chalk.green(`공격력이 ${atkincrease}만큼 상승했습니다.`));
    console.log(chalk.red(`도망칠 확룰이 ${rundecrease}%만큼 하락했습니다.`));
  }

  get runRate() {
    return this._runRate;
  }

  set runRate(val) {
    if (val < 0) this._runRate = 0;
    else this._runRate = val;
  }

  get isRan() {
    return this._isRan;
  }

  set isRan(bool) {
    this._isRan = bool;
  }
}

// 몬스터 클래스
export class Monster extends BaseStat {
  constructor(stage) {
    // HP, Atk, Crit은 stage에 따라 랜덤하게 결정됨
    let Hp = 50 + stage * (Math.random() * 30 + 20);
    let Atk = 12 + stage * (Math.random() * 5 + 5);
    let crit = 0.1 + stage * Math.random() * 3;
    let cirtdmg = 1.5;
    if (stage === 10) {
      // 10스테이지의 보스는 더 강함
      Hp *= 1.3;
      Atk *= 1.1;
      crit = 0.5;
      cirtdmg = 2;
    }
    super(Math.round(Hp), Math.round(Atk), Math.round(crit), cirtdmg);
  }
}
