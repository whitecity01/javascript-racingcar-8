import { Console } from '@woowacourse/mission-utils';
import { IO_MESSAGES } from './constants.js';

class ConsoleIO {
  static async inputCarNames() {
    const input = await Console.readLineAsync(IO_MESSAGES.INPUT_CAR_NAME);
    const carNames = input.split(',');
    return carNames;
  }

  static async inputRoundCount() {
    const input = await Console.readLineAsync(IO_MESSAGES.INPUT_ROUND_COUNT);
    const roundCount = Number(input);
    return roundCount;
  }

  static outputRacingResult(result = '') {
    // TODO : 요구된 포맷으로 결과 포맷팅 필요
    Console.print(result);
  }
}

export default ConsoleIO;
