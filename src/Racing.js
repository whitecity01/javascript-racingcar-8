import { ERRORS } from './constants.js';

class Racing {
  constructor(cars, roundCount) {
    this.cars = cars;

    this.validateRoundCount(roundCount);
    this.roundCount = roundCount;

    this.logs = [];
  }

  validateRoundCount(roundCount) {
    if (Number.isNaN(roundCount)) throw new Error(ERRORS.INVALID_ROUND_COUNT);
    if (roundCount < 1) throw new Error(ERRORS.INVALID_ROUND_COUNT);
  }

  start() {
    this.moveAllRound();
    const winners = []; // TODO : 우승자 계산 로직 필요

    return { logs: this.logs, winners };
  }

  moveAllRound() {
    while (this.roundCount-- > 0) {
      this.moveOneRound();
      this.recordRoundLog();
    }
  }

  moveOneRound() {
    for (const car of this.cars) {
      car.moveWithRandom();
    }
  }

  recordRoundLog() {
    const roundLog = this.cars
      .map(({ name, move }) => `${name} : ${'-'.repeat(move)}`)
      .join('\n');

    this.logs.push(roundLog);
  }
}

export default Racing;
