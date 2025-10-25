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

  static outputRacingResult(racingLogs, winners) {
    const result = [
      '',
      IO_MESSAGES.OUTPUT_LOG_PREFIX,
      racingLogs.join('\n\n'),
      '',
      `${IO_MESSAGES.OUTPUT_WINNER_PREFIX}${winners.join(', ')}`,
    ].join('\n');

    Console.print(result);
  }
}

export default ConsoleIO;
