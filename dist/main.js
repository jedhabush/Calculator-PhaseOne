const output = document.querySelector(".screen__output");
const calculatorKeys = document.querySelector(".calculator-grid");

const calc = {
  valueDisplay: "0",
  firstOperand: null,
  secondOperand: false,
  operator: null,
};

//Functions
// update the output function
function updateOutput() {
  output.value = calc.valueDisplay;
}
updateOutput();

// Display the digits function
function digitDisplay(digit) {
  const { valueDisplay, secondOperand } = calc;

  if (secondOperand === true) {
    calc.valueDisplay = digit;
    calc.secondOperand = false;
  } else
    calc.valueDisplay = valueDisplay === "0" ? digit : valueDisplay + digit;

  console.log(calc);
}

// Display decimal function
function decimalDisplay(dot) {
  if (calc.secondOperand === true) {
    calc.valueDisplay = "0.";
    calc.secondOperand = false;
    return;
  }
  if (!calc.valueDisplay.includes(dot)) {
    return (calc.valueDisplay += dot);
  }
}

//Handle the operators
function operatorInput(nextinput) {
  let { valueDisplay, firstOperand, operator } = calc;
  let input = parseFloat(valueDisplay);
  console.log(calc);
  //conditions
  if (operator && calc.secondOperand) {
    calc.operator = nextinput;
    console.log(calc);
    return;
  }
  if (firstOperand === null && !isNaN(input)) {
    calc.firstOperand = input;
  } else if (operator) {
    let total = calculation(firstOperand, input, operator);
    calc.valueDisplay = `${parseFloat(total.toFixed(8))}`;
    calc.firstOperand = total;
  }
  calc.secondOperand = true;
  calc.operator = nextinput;
}

// Handle Calculations
function calculation(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "x") {
    return firstOperand * secondOperand;
  } else if (operator === "÷") {
    return firstOperand / secondOperand;
  } else if (operator === "%") {
    return firstOperand % secondOperand;
  }

  return secondOperand;
}

// RESET calculations
function resetCalc() {
  calc.valueDisplay = "0";
  calc.firstOperand = null;
  calc.secondOperand = false;
  calc.operator = null;
  console.log(calc);
}

// Event Listeners

// Kyes event listener
calculatorKeys.addEventListener("click", function (e) {
  // Listen to the target element
  const target = e.target;
  // check if the clicked is a button
  if (!target.matches("button")) {
    return;
  }
  //check if the clicked is a digit
  if (target.classList.contains("digit")) {
    //console.log("digital", target.value);
    digitDisplay(target.value);
    updateOutput();

    return;
  }
  //check if the clicked is an operator
  if (target.classList.contains("operator")) {
    //console.log("operator", target.value);
    operatorInput(target.value);
    updateOutput();

    return;
  }
  //check if the clicked is a decimal
  if (target.classList.contains("decimal")) {
    //console.log("decimal", target.value);
    decimalDisplay(target.value);
    updateOutput();
    return;
  }
  if (target.classList.contains("del")) {
    //console.log("decimal", target.value);
    del(target.value);
    updateOutput();
    return;
  }

  resetCalc(target.value);
  updateOutput();
});
