//Exporting Modules
export { calculation, calc, resetCalc, decimalDisplay, negDisplay };

//Calc Object the starting point
const calc = {
  valueDisplay: "0",
  firstOperand: null,
  readyForSecondOperand: false,
  operator: null,
};

// Handle Calculations
const calculation = (firstOperand, readyForSecondOperand, operator) => {
  if (operator === "+") {
    return firstOperand + readyForSecondOperand;
  } else if (operator === "-") {
    return firstOperand - readyForSecondOperand;
  } else if (operator === "x") {
    return firstOperand * readyForSecondOperand;
  } else if (operator === "÷") {
    return firstOperand / readyForSecondOperand;
  } else if (operator === "%") {
    return firstOperand % readyForSecondOperand;
  }

  return readyForSecondOperand;
};

// RESET calculations
const resetCalc = () => {
  calc.valueDisplay = "0";
  calc.firstOperand = null;
  calc.readyForSecondOperand = false;
  calc.operator = null;
  console.log(calc);
};

// Display decimal function
const decimalDisplay = (dot) => {
  if (calc.readyForSecondOperand === true) {
    calc.valueDisplay = "0.";
    calc.readyForSecondOperand = false;
    return;
  }
  if (!calc.valueDisplay.includes(dot)) {
    return (calc.valueDisplay += dot);
  }
};

//Handling negative numbers
const negDisplay = (neg) => {
  if (calc.readyForSecondOperand === false) {
    calc.valueDisplay = neg;
    return;
  }
  if (calc.readyForSecondOperand === true) {
    calc.valueDisplay = "-";

    calc.readyForSecondOperand = false;
    return;
  }
};
