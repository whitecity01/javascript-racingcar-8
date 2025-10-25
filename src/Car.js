import { CAR_VALIDATE, ERRORS } from './constants.js';

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
}

export default Car;
