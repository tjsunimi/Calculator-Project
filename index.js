document.addEventListener("DOMContentLoaded", () => {
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const clearBtn = document.getElementById('clear');
const equalBtn= document.getElementById('equal');

let currentInput = "";
let operatorSet = false;


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        if(value) {
            currentInput += value;
            display.textContent = currentInput;
        }
    });
});

clearBtn.addEventListener('click', () => {
    currentInput = "";
    display.textContent = "0";
});
equalBtn.addEventListener('click', () => {
  calculateResult();
});


document.addEventListener('keydown', (e) => {
        // Prevent default for calculator keys
        if (/[0-9+\-*/.=]|Backspace|Enter/.test(e.key)) {
            e.preventDefault();
        }

        // Handle number and operator keys
        if (/[0-9+\-*/.]/.test(e.key)) {
            handleInput(e.key);
        }
        // Calculate on Enter or =
        else if (e.key === 'Enter' || e.key === '=') {
            calculateResult();
        }
        // Clear on Escape
        else if (e.key === 'Escape') {
            currentInput = "";
            display.textContent = "0";
        }
        // Backspace functionality
        else if (e.key === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || "0";
        }
    });

    // Handle input from both buttons and keyboard
    function handleInput(value) {
        if (value) {
            // Prevent multiple operators in sequence
            if (/[+\-*/]/.test(value)) {
                if (operatorSet) return;
                operatorSet = true;
            } else {
                operatorSet = false;
            }
            
            currentInput += value;
            display.textContent = currentInput;
        }
    }

     // Calculate and display result
    function calculateResult() {
        try {
            if (!currentInput) return;
            
            let result = eval(currentInput);
            display.textContent = result;
            currentInput = result.toString();
            operatorSet = false;
        } catch(error) {
            display.textContent = "Error";
            currentInput = "";
            operatorSet = false;
        }
    }

});

