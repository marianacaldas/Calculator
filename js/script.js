// 1 - Selecionar classes
const previousOperationText = document.querySelector("#previous_operation");
const currentOperationText = document.querySelector("#current_operation");
const buttons = document.querySelectorAll("#buttons_container button");

// 3 - Lógica das operações da calculadora
class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currenteOperation = ""
    }

    // 5 - add digito para a tela da calculadora
    addDigit(digit) {
        // 7 - checar se a operação atual já tem ponto
        if(digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        // 5.1
        this.currentOperation = digit
        this.updateScreen()
    }

    // 8 - Processar todas as operações da calculadora
    processOperation(operation) {
        // 12 - Checar se o valor está vazio
        if(this.currentOperationText.innerText === "" && operation !== "C") {
            // 13 - Mudar operação
            if(this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }


        // 9 - Pegar valores atuais e anteriores
        let operationValue
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current  = +this.currentOperationText.innerText;

        switch(operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearOperation();
                break;
            case "=":
                this.processEqualOperator();
                break;
            default:
                return;
        }
    }

    // 6 - mudar valores para a tela da calculadora
    updateScreen(
        operationValue = null,
        operation = null, 
        current = null, 
        previous = null
    ) 
    {
        
        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else {
            // 10 - Checar se o valor é zero, se for add o valor atual
            if(previous ===  0) {
                operationValue = current            
            }

            // 11 - Add o valor de baixo para cima
            this.previousOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = "";
        }
    }

    // 14 - Mudar operação matemática
    changeOperation(operation) {
        const mathOperation = ["*", "/", "+", "-"]

        if(!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // 15 - Deletar a último dígito
    processDelOperator() {
        this.currentOperationText.innerText = 
            this.currentOperationText.innerText.slice(0, -1);
    }

    // 16 - Limpar a operação atual
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
    }

    // 17 - Limpar tudo da tela da calculadora
    processClearOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    // 18 - Fazer operação de igual
    processEqualOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }

}

// 4 
const calc = new Calculator(previousOperationText, currentOperationText);

// 2 -Fazer click dos botões
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    })
})

