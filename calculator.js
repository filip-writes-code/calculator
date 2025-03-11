const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const reverseButton = document.querySelector('#reverse');
const percentageButton = document.querySelector('#percentage');
const dotButton = document.querySelector('#\\.')

let firstValue = '';
let secondValue = '';
let operatorValue = '';

function add (a, b) {return a + b;};
function subtract (a, b) {return a - b;};
function multiply(a, b) {return a * b;};
function divide(a, b) {return a / b;};

function operate() {
    let operation;
    switch (operatorValue) {
        case "+":
            operation = add;
            break;
        case "-":
            operation = subtract;
            break;
        case "*":
            operation = multiply;
            break;
        case "/":
            operation = divide;
            break;
        };
    return operation(+firstValue, +secondValue).toString();
};

function clear() {
        firstValue = '';
        secondValue = '';
        operatorValue = '';
        refreshDisplay(0);
};

function hasDecimals (value) {
    return value.includes('.') ? true : false;
};

function refreshDisplay(input) {
    display.innerText = input;
};


function positiveNegativeSwitch() {
    if (!operatorValue) {
        firstValue = (+firstValue * -1).toString();
        refreshDisplay(firstValue);
    } else {
        secondValue = (+secondValue * -1).toString();
        refreshDisplay(secondValue);
    };
};

function makePercentage() {
    if (!operatorValue) {
        firstValue = (+firstValue / 100).toString();
        refreshDisplay(firstValue);
    } else {
        secondValue = (+secondValue / 100).toString();
        refreshDisplay(secondValue);
    };
}

function numberClicked(number) {
    if (operatorValue === '=') {
        clear();
    }

    if (!operatorValue) {
        firstValue += number;
        refreshDisplay(firstValue);
    } else {
        secondValue += number;
        refreshDisplay(secondValue);
    };

    hasDecimals(display.innerText) ? dotButton.disabled = true : dotButton.disabled = false;
    console.log(firstValue, secondValue, operatorValue);
};

function operatorClicked(operation) {
    dotButton.disabled = false;
    if (firstValue && operatorValue && secondValue) 
        {
        const result = operate();
        refreshDisplay(result);
        firstValue = result;
        secondValue = '';
        }

    operatorValue = operation;
    console.log(firstValue, secondValue, operatorValue);
};

numberButtons.forEach(button => button.addEventListener('click', () => numberClicked(button.id)));
operatorButtons.forEach(button => button.addEventListener('click', () => operatorClicked(button.id)));
clearButton.addEventListener('click', () => clear());
reverseButton.addEventListener('click', () => positiveNegativeSwitch());
percentageButton.addEventListener('click', () => makePercentage());