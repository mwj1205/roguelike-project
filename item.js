import chalk from 'chalk';
import readlineSync from 'readline-sync';
import Player from './class.js';

export class Item {
  constructor(name, description, effect, isReappear = true) {
    this._name = name;
    this._description = description;
    this._effect = effect;
    this._isReappear = isReappear;
  }
}
