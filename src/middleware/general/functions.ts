import { resultFormatRegExp } from '../validations/gameValidation';

function splitResult(result: string) {
  if (!resultFormatRegExp.test(result)) {
    throw new Error('El resultado no está en el formato correcto.');
  }

  const [scoreHome, scoreAway] = result.split('-');

  return {
    scoreHome: parseInt(scoreHome, 10),
    scoreAway: parseInt(scoreAway, 10)
  };
}

export default splitResult;
