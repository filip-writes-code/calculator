const display = document.querySelector('.display');
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const reverseButton = document.querySelector('#reverse');
const percentageButton = document.querySelector('#percentage');
const dotButton = document.querySelector('#\\.');
const backspaceButton = document.querySelector('#backspace');

let firstValue = '';
let secondValue = '';
let operatorValue = '';

function add (a, b) {return a + b;};
function subtract (a, b) {return a - b;};
function multiply(a, b) {return a * b;};
function divide(a, b) {
    if (b == 0) {
        disableAllButtonsButClear();
        return 'ERROR';}
    else {
    return a / b;}};

function disableAllButtonsButClear() {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => button.disabled = true);
    clearButton.disabled = false;
};

function enableAllButtons () {
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => button.disabled = false);
}

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
    let result = operation(+firstValue, +secondValue);
    return result.toString().length > 9 ? result = result.toFixed(3) : result.toString();
};

function clear() {
        firstValue = '';
        secondValue = '';
        operatorValue = '';
        enableAllButtons();
        refreshDisplay(0);
};

function hasDecimals (value) {
    return value.includes('.') ? true : false;
};

function refreshDisplay(input) {
    if (input === '') {
        display.innerText = '0'}
    else {
    display.innerText = input;}
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
};

function backspace() {
    if (!operatorValue) { 
            firstValue = firstValue.slice(0, -1);
            refreshDisplay(firstValue);
    } else {
        secondValue = secondValue.slice(0, -1);
        refreshDisplay(secondValue);
    };
    hasDecimals(display.innerText) ? dotButton.disabled = true : dotButton.disabled = false;
};

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
};

numberButtons.forEach(button => button.addEventListener('click', () => numberClicked(button.id)));
operatorButtons.forEach(button => button.addEventListener('click', () => operatorClicked(button.id)));
clearButton.addEventListener('click', () => clear());
reverseButton.addEventListener('click', () => positiveNegativeSwitch());
percentageButton.addEventListener('click', () => makePercentage());
backspaceButton.addEventListener('click', () => backspace());