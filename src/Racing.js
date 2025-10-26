import { ERRORS } from './constants.js';

class Racing {
  constructor(cars, roundCount) {
    this.cars = cars;

    this.validateRoundCount(roundCount);
    this.roundCount = roundCount;

    this.racingLogs = [];
  }

  validateRoundCount(roundCount) {
    if (Number.isNaN(roundCount)) throw new Error(ERRORS.INVALID_ROUND_COUNT);
    if (roundCount < 1) throw new Error(ERRORS.INVALID_ROUND_COUNT);
  }

  start() {
    this.moveAllRound();
    const winners = this.getWinners();

    return { racingLogs: this.racingLogs, winners };
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

    this.racingLogs.push(roundLog);
  }

  getWinners() {
    const maxMove = this.getMaxMove();
    const winners = this.cars
      .filter(({ move }) => move === maxMove)
      .map(({ name }) => name);
    return winners;
  }

  getMaxMove() {
    return Math.max(...this.cars.map((car) => car.move));
  }
}

export default Racing;
