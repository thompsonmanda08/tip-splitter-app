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
        this.bill_amount = '0.00';
        this.tip_percentage = '0.00';
        this.num_of_People = 1;

    }

    // Get the bill amount entered in the form
    getBill(bill_amount) {
        if(bill_amount === 0 || bill_amount === '') return billAmount.setCustomValidity('Enter a valid bill amount');
        this.bill_amount = bill_amount;
    }

    // Gets and sets the percentage amount to be used for calculations
    getTipPercentage(tip_percentage){
        /* Assign the tip percentage */
        switch(tip_percentage) {
            case '5%':
                this.tip_percentage = 0.05;
                break;
            case '10%':
                this.tip_percentage = 0.1;
                break;
            case '15%':
                this.tip_percentage = 0.15;
                break;
            case '25%':
                this.tip_percentage = 0.25;
                break
            case '50%':
                this.tip_percentage = 0.5;
                break
            default:
                this.tip_percentage = 0;
        }

    }

    // Gets the number of people to split the bill amongst
    getPeopleNum(num_of_people){
       /* if(num_of_people === 0 || num_of_people === '') return numOfPeople.setCustomValidity("Can't be Zero!");*/
        this.num_of_People = num_of_people;
    }

    //Updates the Total amount values per person
    updateTotalDisplay(){
        
        this.billAmount.value = parseFloat(this.bill_amount);
        this.tip_amount = parseFloat(this.tip_percentage) * parseFloat(this.bill_amount);

        if (this.numOfPeople != null) {
            this.numOfPeople.value = parseInt(this.num_of_People);
        }

        if (this.numOfPeople.value == 0) {
            numOfPeople.setCustomValidity("Can't be Zero!");
        }

        this.tipPerPersonTextElement.innerText = (this.tip_amount) / this.numOfPeople.value;
        this.totalAmountTextElement.innerText = (this.billAmount.value) / this.numOfPeople.value;


    }
}

// VARIABLES OF ELEMENTS
const billAmount = document.querySelector('[data-bill-amount]');
const tipPercentage = document.querySelectorAll('[data-tip-percentage]');
const numOfPeople = document.querySelector('[data-num-people]');
const tipPerPersonTextElement = document.querySelector('[data-tip-amount]');
const totalAmountTextElement = document.querySelector('[data-total-amount]');
const resetButton = document.querySelector('[data-reset-button]');

// APP OBJECT
const splitMyBill = new SpiltTheBill(tipPerPersonTextElement, totalAmountTextElement, billAmount, tipPercentage, numOfPeople);

//EVENTS THAT TRIGGER THE APP
// Clears all values
resetButton.addEventListener('click', () => {
    splitMyBill.resetAll();
    splitMyBill.updateTotalDisplay();
});


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


