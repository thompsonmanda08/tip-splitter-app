class SpiltTheBill {

    constructor(tipPerPersonTextElement, totalAmountTextElement, billAmount, tipPercentage, numOfPeople){
        this.tipPerPersonTextElement = tipPerPersonTextElement;
        this.totalAmountTextElement = totalAmountTextElement;
        this.billAmount = billAmount;
        this.tipPercentage = tipPercentage;
        this.numOfPeople = numOfPeople;
        this.resetAll();
    }

    // A method to clear everything on the screen
    resetAll(){
        this.tipPerPersonTextElement = '0.00';
        this.totalAmountTextElement = '0.00'
        this.billAmount = 0.00;
        this.tipPercentage = undefined;
        this.numOfPeople = 1;


    }

    // Get the bill amount entered in the form
    getBill(bill_amount) {
        if(bill_amount === 0 || bill_amount === '') return billAmount.setCustomValidity('Enter a valid bill amount');
        this.billAmount = bill_amount;
    }

    // Gets and sets the percentage amount to be used for calculations
    getTipPercentage(tip_percentage){
        /* Assign the tip percentage */
        switch(tip_percentage) {
            case '5%':
                tip_percentage = 0.05;
                break;
            case '10%':
                tip_percentage = 0.1;
                break;
            case '15%':
                tip_percentage = 0.15;
                break;
            case '25%':
                tip_percentage = 0.25;
                break
            case '50%':
                tip_percentage = 0.5;
                break
            default:
                tip_percentage = 0;
        }

        return this.getTipPercentage = tip_percentage;
    }

    // Gets the number of people to split the bill amongst
    getPeopleNum(num_of_people){
        if(num_of_people === 0 || num_of_people === '') return numOfPeople.setCustomValidity("Can't be Zero!");
        this.numOfPeople = num_of_people;
    }

    //Updates the Total amount values per person
    updateTotalDisplay(){
        this.tipAmount = parseFloat(this.tipPercentage) * parseFloat(this.billAmount);
        this.billAmount = parseFloat(this.billAmount);
        this.numOfPeople = parseInt(this.numOfPeople);
        this.tipPerPersonTextElement.innerText = this.tipAmount / this.numOfPeople;
        this.totalAmountTextElement.innerText = (this.tipAmount + this.billAmount) / this.numOfPeople;
    }
}


const billAmount = document.querySelector('[data-bill-amount]');
const tipPercentage = document.querySelectorAll('[data-tip-percentage]');
const numOfPeople = document.querySelector('[data-num-people]');
const tipPerPersonTextElement = document.querySelector('[data-tip-amount]');
const totalAmountTextElement = document.querySelector('[data-total-amount]');
const resetButton = document.querySelector('[data-reset-button]');



const splitMyBill = new SpiltTheBill(tipPerPersonTextElement, totalAmountTextElement, billAmount, tipPercentage, numOfPeople);

// Get the inputted bill amount from the form
billAmount.addEventListener(
    'input', () => {
        splitMyBill.getBill(billAmount.value);
        splitMyBill.updateTotalDisplay();

    }
)

// Get the tip percentage
tipPercentage.forEach(button => {
    button.addEventListener('click', ()=> {
        splitMyBill.getTipPercentage(button.innerText);
        splitMyBill.updateTotalDisplay();

    })
})

// Get the inputted number of people from the form
numOfPeople.addEventListener(
    'input', () => {
        splitMyBill.getPeopleNum(numOfPeople.value);
        splitMyBill.updateTotalDisplay();

    }
)

resetButton.addEventListener('click', () => {
    splitMyBill.resetAll();
    splitMyBill.updateTotalDisplay();
});



