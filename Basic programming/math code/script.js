const math = require("mathjs");

function solveComplexFraction() {
  const numerator = math.complex("2i - 1");
  const numeratorCubed = math.pow(numerator, 3);

  let denominator = math.complex("i");
  for (let i = 1; i <= 10; i++) {
    denominator = math.multiply(denominator, math.complex(`i + ${i}`));
  }

  const result = math.divide(numeratorCubed, denominator);

  return result;
}

const result = solveComplexFraction();
console.log("Result:", result.toString());
