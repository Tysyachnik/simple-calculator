import "./style.css";
import themeIcon from "../assets/theme-light-dark.svg";

let toggleThemeBtn = document.getElementById("toggle-theme");
toggleThemeBtn.innerHTML = `<img src="${themeIcon}" alt="Toggle theme" />`;

let display = document.querySelector(".display");
let buttons = document.querySelectorAll("button");

let currentInput = "";
let operator = null;
let previousInput = "";

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    let value = e.target.innerText;

    if (e.target.classList.contains("number")) {
      currentInput += value;
      display.value = currentInput;
    } else if (e.target.classList.contains("operator")) {
      if (currentInput !== "") {
        previousInput = currentInput;
        operator = value;
        currentInput = "";
        display.value = operator;
      }
    } else if (e.target.classList.contains("decimal")) {
      if (!currentInput.includes(".")) {
        currentInput += value;
        display.value = currentInput;
      }
    } else if (e.target.classList.contains("clear-last")) {
      if (currentInput !== "") {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
      }
    } else if (e.target.classList.contains("toggle-sign")) {
      if (currentInput !== "") {
        currentInput = parseFloat(currentInput) * -1;
        display.value = currentInput;
      }
    } else if (e.target.classList.contains("all-clear")) {
      currentInput = "";
      previousInput = "";
      operator = null;
      display.value = "";
    } else if (e.target.classList.contains("equals")) {
      if (previousInput !== "" && currentInput !== "" && operator !== null) {
        let a = parseFloat(previousInput);
        let b = parseFloat(currentInput);
        let result;

        if (operator === "*") {
          result = a * b;
        } else if (operator === "-") {
          result = a - b;
        } else if (operator === "+") {
          result = a + b;
        } else if (operator === "/") {
          result = b !== 0 ? a / b : "Error";
        } else if (operator === "%") {
          result = (a / 100) * b;
        }

        currentInput = result.toString();
        operator = null;
        previousInput = "";
        display.value = currentInput;
      }
    }
  });
});

if (localStorage.getItem("theme")) {
  document.body.className = localStorage.getItem("theme");
} else {
  document.body.className = "light";
}

toggleThemeBtn.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.className = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.className = "light";
    localStorage.setItem("theme", "light");
  }
});
