enum operators {
  plus = '+',
  minus = '-',
  division = '/',
  multiplication = '*'
}

// calc + and -
function calcPlusAndMinus(operatorsAndNumbers: string[]) {
  let index = 1;
  let result = +operatorsAndNumbers[0];
  while (index < operatorsAndNumbers.length) {
    if (operatorsAndNumbers[index] === operators.minus) {
      result -= +operatorsAndNumbers[+index + 1];
    } else if (operatorsAndNumbers[index] === operators.plus) {
      result += +operatorsAndNumbers[+index + 1];
    }
    index += 2;
  }
  return result;
}

// calc * and /
function calcMultiAndDiv(operatorsAndNumbers: any[]) {
  let index = 1;
  let result: number;

  while (index < operatorsAndNumbers.length) {
    if (operatorsAndNumbers[index] !== operators.minus && operatorsAndNumbers[index] !== operators.plus) {
      if (operatorsAndNumbers[index] === operators.multiplication) {
        result = +operatorsAndNumbers[index - 1] * +operatorsAndNumbers[+index + 1];
      } else if (operatorsAndNumbers[index] === operators.division) {
        result = +operatorsAndNumbers[index - 1] / +operatorsAndNumbers[+index + 1];
      }
      operatorsAndNumbers[index + 1] = result;
      operatorsAndNumbers[index - 1] = null;
      operatorsAndNumbers[index] = null;
    }
    index += 2;
  }
}

export function calcExpression(expression: string) {
  let operatorsAndNumbers = expression.split(/(?<=[-+*/])|(?=[-+*/])/);

  calcMultiAndDiv(operatorsAndNumbers);

  // remove nulls from array
  operatorsAndNumbers = operatorsAndNumbers.filter(_ => !!_);

  return calcPlusAndMinus(operatorsAndNumbers);
}
