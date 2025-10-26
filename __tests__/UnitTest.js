import { Console, Random } from '@woowacourse/mission-utils';
import App from '../src/App';
import Car from '../src/Car';
import Racing from '../src/Racing';
import { CAR_MOVE_CONDITIONS } from '../src/constants';
import ConsoleIO from '../src/ConsoleIO';

afterEach(() => {
  jest.clearAllMocks();
  jest.restoreAllMocks();
});

const mockRandoms = (value) => {
  Random.pickNumberInRange = jest.fn();
  Random.pickNumberInRange.mockReturnValue(value);
};

test('입력을 두 번, 출력을 한 번 실행하는지?', async () => {
  const inputLogSpy = jest.spyOn(Console, 'readLineAsync');
  const outputLogSpy = jest.spyOn(Console, 'print');

  inputLogSpy.mockResolvedValueOnce('a,b,c').mockResolvedValueOnce('3');

  const app = new App();
  await app.run();

  expect(inputLogSpy).toHaveBeenCalledTimes(2);
  expect(outputLogSpy).toHaveBeenCalledTimes(1);
});

describe('Car 생성 및 유효성 검사', () => {
  test('유효한 이름으로 Car 생성 시 정상 동작', () => {
    const car = new Car('car1');

    expect(car.name).toBe('car1');
    expect(car.move).toBe(0);
  });

  test('이름이 공백일 경우 오류 발생', () => {
    expect(() => new Car('')).toThrow(/^\[ERROR\]/);
  });

  test('이름이 5글자 초과일 경우 오류 발생', () => {
    expect(() => new Car('abcdef')).toThrow(/^\[ERROR\]/);
  });
});

describe('경주 게임 실행 로직', () => {
  test('라운드 횟수가 양의 정수가 아닐 경우 에러 처리', () => {
    const cars = [new Car('car1')];

    const nan = Number('안녕 난 난이야');
    expect(() => new Racing(cars, nan)).toThrow(/^\[ERROR\]/);

    const nan2 = Number('1 2');
    expect(() => new Racing(cars, nan2)).toThrow(/^\[ERROR\]/);

    const zero = Number('0');
    expect(() => new Racing(cars, zero)).toThrow(/^\[ERROR\]/);

    const minus = Number('-2');
    expect(() => new Racing(cars, minus)).toThrow(/^\[ERROR\]/);
  });

  test('Random 값이 4일 경우 전진 여부 테스트', () => {
    const cars = [new Car('car1')];
    const roundCount = 3;
    mockRandoms(CAR_MOVE_CONDITIONS.MOVE_THRESHOLD);

    const racing = new Racing(cars, roundCount);

    racing.start();
    expect(cars[0].move).toBe(3);
  });

  test('Random 값이 3일 경우 정지 여부 테스트', () => {
    const cars = [new Car('car1')];
    const roundCount = 3;
    mockRandoms(CAR_MOVE_CONDITIONS.MOVE_THRESHOLD - 1);
    const racing = new Racing(cars, roundCount);

    racing.start();
    expect(cars[0].move).toBe(0);
  });
});

describe('경주 게임 로깅', () => {
  test('각 라운드 종료 시 로깅 함수 동작 여부', () => {
    const car = new Car('car1');
    car.moveWithRandom = jest.fn(() => car.move++);
    const racing = new Racing([car], 3);

    const recordLogSpy = jest.spyOn(racing, 'recordRoundLog');
    racing.start();

    expect(car.moveWithRandom).toHaveBeenCalledTimes(3);
    expect(recordLogSpy).toHaveBeenCalledTimes(3);
    expect(racing.racingLogs.length).toBe(3);
  });

  test('로깅 포맷 검사', () => {
    const car1 = new Car('car1');
    const car2 = new Car('car2');
    const cars = [car1, car2];
    car1.moveWithRandom = jest.fn(() => car1.move++);
    car2.moveWithRandom = jest.fn(() => car2.move);
    const racing = new Racing(cars, 3);

    const expectLogs = [
      'car1 : -\ncar2 : ',
      'car1 : --\ncar2 : ',
      'car1 : ---\ncar2 : ',
    ];

    racing.start();

    expect(racing.racingLogs).toEqual(expectLogs);
  });
});

describe('결과 출력', () => {
  test('결과 출력 포맷 검사1', () => {
    const expectLogs = ['car1 : -\ncar2 : ', 'car1 : --\ncar2 : '];

    const winners = ['car1'];
    const logSpy = jest.spyOn(Console, 'print');
    ConsoleIO.outputRacingResult(expectLogs, winners);

    const expectOutput = `\n실행 결과\ncar1 : -\ncar2 : \n\ncar1 : --\ncar2 : \n\n최종 우승자 : car1`;
    expect(logSpy.mock.calls[0][0]).toEqual(expectOutput);
  });
});
