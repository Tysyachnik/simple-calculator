import "./style.css";

let toggleThemeBtn = document.getElementById("toggle-theme");

let display = document.querySelector(".display");
let expressionDisplay = document.querySelector(".expression-display");
let buttonsContainer = document.querySelector(".buttons");

let currentInput = "";
let operator = null;
let previousInput = "";

function handleNumber(value) {
  currentInput += value;
  display.value = currentInput;
}

function handleOperator(newOperator) {
  if (currentInput === "" && previousInput === "") return;

  if (previousInput !== "" && currentInput !== "") {
    const result = calculate(
      parseFloat(previousInput),
      parseFloat(currentInput),
      operator
    );

    if (result === "Error") {
      display.value = result;
      expressionDisplay.textContent = "";
      currentInput = "";
      previousInput = "";
      operator = null;
      return;
    }

    previousInput = result.toString();
    currentInput = "";
    display.value = previousInput + newOperator;
    currentInput = "";
  } else if (currentInput !== "") {
    previousInput = currentInput;
    currentInput = "";
  }

  operator = newOperator;
  display.value = "";
  expressionDisplay.textContent = `${previousInput} ${operator}`;
}

function handleDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
    display.value = currentInput;
  }
}

function handleClearLast() {
  if (currentInput !== "") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
}

function handleToggleSign() {
  if (currentInput !== "") {
    currentInput = (parseFloat(currentInput) * -1).toString();
    display.value = currentInput;
  }
}

function handlePercent() {
  if (currentInput === "") return;

  let preResult;
  let result;
  
  if (previousInput !== "" && operator !== null) {
    let base = parseFloat(previousInput);
    let percent = parseFloat(currentInput);

    preResult = (base * percent) / 100;
    result = calculate(base, preResult, operator)
  } else {
    let number = parseFloat(currentInput);
    result = number / 100;
  }

  currentInput = result.toString();
  display.value = currentInput;
  expressionDisplay.textContent = "";
}

function handleAllClear() {
  currentInput = "";
  previousInput = "";
  operator = null;
  display.value = "";
  expressionDisplay.textContent = "";
}

function calculate(a, b, operator) {
  switch (operator) {
    case "*":
      return a * b;
    case "-":
      return a - b;
    case "+":
      return a + b;
    case "/":
      return b !== 0 ? a / b : "Error";
    default:
      return "Error";
  }
}

function handleEquals() {
  if (previousInput !== "" && currentInput !== "" && operator !== null) {
    let result = calculate(
      parseFloat(previousInput),
      parseFloat(currentInput),
      operator
    );

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    display.value = currentInput;
    expressionDisplay.textContent = "";
  }
}

buttonsContainer.addEventListener("click", (e) => {
  let button = e.target.closest("button");
  if (!button) return;

  let value = button.innerText;

  if (button.classList.contains("number")) {
    handleNumber(value);
  } else if (button.classList.contains("operator")) {
    handleOperator(value);
  } else if (button.classList.contains("decimal")) {
    handleDecimal();
  } else if (button.classList.contains("clear-last")) {
    handleClearLast();
  } else if (button.classList.contains("toggle-sign")) {
    handleToggleSign();
  } else if (button.classList.contains("all-clear")) {
    handleAllClear();
  } else if (button.classList.contains("equals")) {
    handleEquals();
  } else if (button.classList.contains("percent")) {
    handlePercent();
  }
});

let savedTheme = localStorage.getItem("theme") || "light";
document.body.className = savedTheme;

toggleThemeBtn.addEventListener("click", () => {
  let newTheme = document.body.classList.contains("light") ? "dark" : "light";
  document.body.className = newTheme;
  localStorage.setItem("theme", newTheme);
});

