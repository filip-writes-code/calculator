function add (a, b) {
    return a + b;
};

function subtract (a, b) {
    return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

function operate(numberOne, numberTwo, operator) {
    let operation;
    switch (operator) {
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
    return operation(numberOne, numberTwo);
};