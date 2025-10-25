import ConsoleIO from './ConsoleIO.js';

class App {
  async run() {
    const carNames = await ConsoleIO.inputCarNames();
    // TODO : 자동차 객체 생성 + 에러처리
    const roundCount = await ConsoleIO.inputRoundCount();
    // TODO : 라운드 횟수 에러처리

    const result = ''; // TODO : 레이싱 결과 반환
    ConsoleIO.outputRacingResult(result);
  }
}

export default App;
