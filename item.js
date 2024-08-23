import chalk from 'chalk';
import readlineSync from 'readline-sync';

export class Item {
  constructor(name, description, effect, isReappear = true) {
    this._name = name;
    this._description = description;
    this._effect = effect;
    this._isReappear = isReappear;
  }

  use(target) {
    this._effect(target);
  }
}

const itemTable = [
  new Item(
    '고급 회복약',
    '체력을 30 회복합니다.',
    (player) => {
      player.hp += 30;
    },
    true,
  ),

  new Item(
    '힘의 반지',
    '공격력을 5 상승시킵니다.',
    (player) => {
      player.atk += 5;
    },
    true,
  ),

  new Item(
    '가벼운 갑옷',
    '기본 방어 성공률이 낮아지지만, 더이상 연속 방어에 따른 방어 확률 감소가 적용되지 않습니다.',
    (player) => {
      player.basedefRate = 0.45;
      // 방어 확률 감소 안되는 로직
    },
    false,
  ),

  new Item(
    '은신 로브',
    '도망 성공률이 10% 증가합니다.',
    (player) => {
      player.runRate += 0.1;
    },
    true,
  ),

  new Item(
    '아드레날린',
    '크리티컬 확률과 데미지가 증가합니다.',
    (player) => {
      player.chriticalRate += 0.05;
      player.criticalDamage += 0.2;
    },
    true,
  ),

  new Item(
    '신속물약',
    '반격 확률이 증가합니다.',
    (player) => {
      player.counterRate += 0.05;
    },
    true,
  ),

  new Item(
    '너무 짧은 단검',
    '반격 확률이 크게 감소하지만 반격 데미지가 크게 상승합니다.',
    (player) => {
      player.counterRate -= 0.25;
      player.counterDamage += 1.0;
    },
    false,
  ),
];
