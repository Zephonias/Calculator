//Initialize elements of HTML as variable.
const display = document.getElementById("input-display");
const number = document.querySelectorAll(".number");
const clear = document.getElementById("clear");
const sign = document.getElementById("sign");
const percentage = document.getElementById("percentage");
const divide = document.getElementById("divide");
const mul = document.getElementById("mul");
const sub = document.getElementById("sub");
const add = document.getElementById("add");
const result = document.getElementById("result");

let num1 = null;
let operator = null;
let waitingNum2 = false;

//Add numbers to display as they are clicked
function appendDisplay(value){
    if (display.value === "0" || waitingNum2){
        display.value = value;
        waitingNum2 = false;
    }
    else {
        display.value += value;
    }
}
//Adjust the font size of elements in display based on content length
function adjustFont(){
    const contentLength = display.value.length;
    let fontSize = 75;
    const maxLength = 16;
    
    if (contentLength >= 8){
        fontSize = 50;
    }
    if(contentLength >= 12){
        fontSize = 34;
    }
    
    if (contentLength > maxLength){
        display.value = display.value.substring(0, maxLength)
    }

    display.style.fontSize = fontSize + "px";
}
//Check if number buttons are clicked, and add them to display
number.forEach (button => {
    button.addEventListener('click', ()=>{
    const value = button.innerText;
    appendDisplay(value);
    adjustFont();
})
})
//Clear content in display when clear button is clicked
function clearDisplay(){
    display.value = 0;
}
clear.addEventListener('click', ()=>{
    clearDisplay();
    adjustFont();
})

//Calculate the percentage of the number
function percentageCalc(){
    let num = 0;
    num = parseFloat(display.value);
    num = num/100;
    display.value = num;
    adjustFont();
}
percentage.addEventListener('click', ()=>{
    percentageCalc();
})

//Claculation for the 4 main calculations
function performCalculation(){
    
    if(num1 !== null && operator !== null && !waitingNum2){
        let num2 = parseFloat(display.value);
        
        switch(operator){
            case "add":
                num1 += num2;
                break;
            case "sub":
                num1 -= num2;
                break;
            case "mul":
                num1 *= num2;
                break;
            case "div":
                num1 /= num2;
                break;
        }

        display.value = num1;
        adjustFont();
    
        num1 = null;
        operator = null;
        waitingNum2 = false;
    }
}

function operatorSelected(selected){
    if(num1 === null){
        num1 = parseFloat(display.value);
        operator = selected;
        waitingNum2 = true;  
    }
    else{
        performCalculation();
        operator = selected;
        waitingNum2 = true;
    }
}


add.addEventListener('click', ()=>{
    operatorSelected("add");
})
sub.addEventListener('click', ()=>{
    operatorSelected("sub");
})
mul.addEventListener('click', ()=>{
    operatorSelected("mul");
})
divide.addEventListener('click', ()=>{
    operatorSelected("div");
})

result.addEventListener('click', () =>{
    performCalculation();
})