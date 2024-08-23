import chalk from 'chalk';

// 몬스터와 플레이어의 부모 클래스
class BaseStat {
  constructor(hp, atk, criticalRate, criticalDamage) {
    this._hp = hp;
    this._atk = atk;
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
    if (atk > this._atk) {
      console.log(chalk.green(`공격력이 ${atk - this._atk}만큼 증가했습니다. 현재 공격력: ${atk}`));
    } else if (atk < this._atk) {
      console.log(chalk.red(`공격력이 ${this._atk - atk}만큼 감소했습니다. 현재 공격력: ${atk}`));
    }
    this._atk = atk;
  }

  get hp() {
    return this._hp;
  }

  set hp(val) {
    if (val > this._hp) {
      console.log(chalk.green(`HP가 ${val - this._hp}만큼 회복되었습니다. 현재 HP: ${val}`));
    } else if (val < this._hp) {
      console.log(chalk.red(`HP가 ${this._hp - val}만큼 감소했습니다. 현재 HP: ${val}`));
    }
    if (val < 0) this._hp = 0;
    else this._hp = val;
  }

  get criticalRate() {
    return this._criticalRate;
  }

  set criticalRate(val) {
    if (val > this._criticalRate) {
      console.log(
        chalk.green(
          `크리티컬 확률이 ${Math.round((val - this._criticalRate) * 100 * 10) / 10}% 증가했습니다. 현재 크리티컬 확률: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    } else if (val < this._criticalRate) {
      console.log(
        chalk.red(
          `크리티컬 확률이 ${Math.round((this._criticalRate - val) * 100 * 10) / 10}% 감소했습니다. 현재 크리티컬 확률: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    }
    if (val < 0) this._criticalRate = 0;
    else if (val > 1) this._criticalRate = 1;
    else this._criticalRate = val;
  }

  get criticalDamage() {
    return this._criticalDamage;
  }

  set criticalDamage(val) {
    if (val > this._criticalDamage) {
      console.log(
        chalk.green(
          `크리티컬 데미지가 ${Math.round((val - this._criticalRate) * 100 * 10) / 10}% 증가했습니다. 현재 크리티컬 데미지: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    } else if (val < this._criticalDamage) {
      console.log(
        chalk.red(
          `크리티컬 데미지가 ${Math.round((this._criticalDamage - val) * 100 * 10) / 10}% 감소했습니다. 현재 크리티컬 데미지: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    }
    if (val < 1)
      this._criticalDamage = 1; // 크리티컬 데미지는 최소 1배
    else this._criticalDamage = val;
  }
}

// player 클래스
export class Player extends BaseStat {
  constructor() {
    super(100, 20, 0.45, 2);
    this._runRate = 0.4;
    this._isRan = false;
    this._basedefRate = 0.8;
    this._nowdefRate = 0.8;
    this._counterRate = 0.3;
    this._counterDamage = 0.7;
  }

  playerClearStage() {
    // 스테이지를 클리어했을 때 받는 보너스 스텟
    const heal = Math.floor(Math.random() * 100) + 50;
    const atkincrease = Math.floor(Math.random() * 6) + 3;
    const rundecrease = Math.round(Math.random() * 5 * 10) / 10 + 1;

    this.hp += heal;
    this.atk += atkincrease;
    this.runRate -= rundecrease / 100;
    this.nowdefRate = this.basedefRate;
  }

  playerDef() {
    const isdef = Math.random() <= this._nowdefRate;
    this.nowdefRate /= 2;
    return isdef;
  }

  playerCounter(target) {
    const dmg = Math.round(Math.random() * this.atk * this.counterDamage);
    target.hit(dmg);
    return dmg;
  }

  get runRate() {
    return this._runRate;
  }

  set runRate(val) {
    if (val > this._runRate) {
      console.log(
        chalk.green(
          `도망 성공률이 ${Math.round((val - this._runRate) * 100 * 10) / 10}% 증가했습니다. 현재 도망 성공률: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    } else if (val < this._runRate) {
      console.log(
        chalk.red(
          `도망 성공률이 ${Math.round((this._runRate - val) * 100 * 10) / 10}% 감소했습니다. 현재 도망 성공률: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    }
    if (val < 0) this._runRate = 0;
    else if (val > 1) this._runRate = 1.0;
    else this._runRate = val;
  }

  get isRan() {
    return this._isRan;
  }

  set isRan(bool) {
    this._isRan = bool;
  }

  get basedefRate() {
    return this._basedefRate;
  }

  set basedefRate(val) {
    if (val > this._basedefRate) {
      console.log(
        chalk.green(
          `기본 방어 확률이 ${Math.round((val - this._basedefRate) * 100 * 10) / 10}% 증가했습니다. 현재 기본 방어 확률: ${Math.round(rate * 100 * 10) / 10}%`,
        ),
      );
    } else if (val < this._basedefRate) {
      console.log(
        chalk.red(
          `기본 방어 확률이 ${Math.round((this._basedefRate - val) * 100 * 10) / 10}% 감소했습니다. 현재 기본 방어 확률: ${Math.round(rate * 100 * 10) / 10}%`,
        ),
      );
    }
    if (val < 0) this._basedefRate = 0;
    else if (val > 1) this._basedefRate = 1.0;
    else this._basedefRate = val;
  }

  get nowdefRate() {
    return this._nowdefRate;
  }

  set nowdefRate(val) {
    if (val < 0) this._nowdefRate = 0;
    else if (val > 1) this._nowdefRate = 1.0;
    else this._nowdefRate = val;
  }

  get counterRate() {
    return this._counterRate;
  }

  set counterRate(val) {
    if (val > this._counterRate) {
      console.log(
        chalk.green(
          `반격 확률이 ${Math.round((val - this._counterRate) * 100 * 10) / 10}% 증가했습니다. 현재 반격 확률: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    } else if (val < this._counterRate) {
      console.log(
        chalk.red(
          `반격 확률이 ${Math.round((this._counterRate - val) * 100 * 10) / 10}% 감소했습니다. 현재 반격 확률: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    }
    if (val < 0) this._counterRate = 0;
    else if (val > 1) this._counterRate = 1.0;
    else this._counterRate = val;
  }

  get counterDamage() {
    return this._counterDamage;
  }

  set counterDamage(val) {
    if (val > this._counterDamage) {
      console.log(
        chalk.green(
          `반격 데미지가 ${Math.round((val - this._counterDamage) * 100 * 10) / 10}% 증가했습니다. 현재 반격 데미지: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    } else if (val < this._counterDamage) {
      console.log(
        chalk.red(
          `반격 데미지가 ${Math.round((this._counterDamage - val) * 100 * 10) / 10}% 감소했습니다. 현재 반격 데미지: ${Math.round(val * 100 * 10) / 10}%`,
        ),
      );
    }
    if (val < 0) this._counterDamage = 0;
    else this._counterDamage = val;
  }
}

// 몬스터 클래스
export class Monster extends BaseStat {
  constructor(stage) {
    // HP, Atk, Crit은 stage에 따라 랜덤하게 결정됨
    let Hp = 50 + stage * (Math.random() * 30 + 20);
    let Atk = 12 + stage * (Math.random() * 5 + 4);
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
