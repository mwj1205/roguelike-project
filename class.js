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
export class Player extends BaseStat {
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
export class Monster extends BaseStat {
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
