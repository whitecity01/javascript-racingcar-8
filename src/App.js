import Car from './Car.js';
import ConsoleIO from './ConsoleIO.js';
import Racing from './Racing.js';

class App {
  async run() {
    const carNames = await ConsoleIO.inputCarNames();
    const cars = carNames.map((carName) => new Car(carName));

    const roundCount = await ConsoleIO.inputRoundCount();

    const racing = new Racing(cars, roundCount);

    const result = racing.start(); // TODO : 레이싱 결과 반환
    ConsoleIO.outputRacingResult(result);
  }
}

export default App;
