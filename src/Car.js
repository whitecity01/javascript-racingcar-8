import { Random } from '@woowacourse/mission-utils';
import { CAR_MOVE_CONDITIONS, CAR_VALIDATE, ERRORS } from './constants.js';

class Car {
  constructor(name) {
    this.validateName(name);
    this.name = name;
    this.move = 0;
  }

  validateName(name) {
    if (name.length < CAR_VALIDATE.MIN_NAME_LEN)
      throw new Error(ERRORS.CAR_NAME_TOO_SHORTS);
    if (name.length > CAR_VALIDATE.MAX_NAME_LEN)
      throw new Error(ERRORS.CAR_NAME_TOO_LONG);
  }

  moveWithRandom() {
    const { RANDOM_MIN, RANDOM_MAX, MOVE_THRESHOLD } = CAR_MOVE_CONDITIONS;

    const perfomance = Random.pickNumberInRange(RANDOM_MIN, RANDOM_MAX);
    if (MOVE_THRESHOLD <= perfomance) this.move++;
  }
}

export default Car;
