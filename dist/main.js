import {
  calc,
  calculation,
  resetCalc,
  decimalDisplay,
  negDisplay,
} from "./functions.js";

//Selecting DOM elements
const output = document.querySelector(".screen__output");
const calculatorKeys = document.querySelector(".calculator-grid");

//Functions
// update the output function
const updateOutput = () => {
  output.value = calc.valueDisplay;
};
updateOutput();

// Display the digits function
const digitDisplay = (digit) => {
  const { valueDisplay, readyForSecondOperand } = calc;

  if (readyForSecondOperand === true) {
    calc.valueDisplay = digit;
    calc.readyForSecondOperand = false;
  } else
    calc.valueDisplay = valueDisplay === "0" ? digit : valueDisplay + digit;

  console.log(calc);
};

//Handle the operators and if different operators entered
const operatorInput = (diffOperator) => {
  let { valueDisplay, firstOperand, operator } = calc;
  let input = parseFloat(valueDisplay);
  console.log(calc);

  //conditions
  if (operator && calc.readyForSecondOperand) {
    calc.operator = diffOperator;
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
  calc.readyForSecondOperand = true;
  calc.operator = diffOperator;
};

// Event Listeners

// Kyes event listener
/*
The reason for not choosing all button elemetns for the click event is because 
all buttons are children of "calculator.grid" element and by knowing that 
we can use <event delegation> to filter down the <click event> to children elements 
*/
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

  //Check if the Negative button clicked
  if (target.classList.contains("negative")) {
    negDisplay(target.value);
    updateOutput();
    return;
  }

  resetCalc(target.value);
  updateOutput();
});
