import Car from './Car.js';
import ConsoleIO from './ConsoleIO.js';

class App {
  async run() {
    const carNames = await ConsoleIO.inputCarNames();
    const cars = carNames.map((carName) => new Car(carName));

    const roundCount = await ConsoleIO.inputRoundCount();
    // TODO : 라운드 횟수 에러처리

    const result = ''; // TODO : 레이싱 결과 반환
    ConsoleIO.outputRacingResult(result);
  }
}

export default App;
