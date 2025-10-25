export const IO_MESSAGES = {
  INPUT_CAR_NAME:
    '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
  INPUT_ROUND_COUNT: '시도할 횟수는 몇 회인가요?\n',
  OUTPUT_LOG_PREFIX: '실행 결과',
  OUTPUT_WINNER_PREFIX: '최종 우승자 : ',
};

export const CAR_VALIDATE = {
  MAX_NAME_LEN: 5,
  MIN_NAME_LEN: 1,
};

export const CAR_MOVE_CONDITIONS = {
  RANDOM_MIN: 0,
  RANDOM_MAX: 9,
  MOVE_THRESHOLD: 4,
};

const prefixError = (msg) => `[ERROR] ${msg}`;

export const ERRORS = {
  CAR_NAME_TOO_LONG: prefixError('자동차 이름은 5자 이하만 가능합니다.'),
  CAR_NAME_TOO_SHORTS: prefixError(
    '자동차 이름은 최소 1글자 이상만 가능합니다.',
  ),
  INVALID_ROUND_COUNT: prefixError('시도 횟수는 양의 정수를 입력해주세요'),
};
