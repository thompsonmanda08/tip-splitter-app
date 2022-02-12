class SpiltTheBill {
  constructor(
    tipPerPersonTextElement,
    totalAmountTextElement,
    billAmount,
    numOfPeople,
    billLabelInfo,
    numOfPeopleLabelInfo
  ) {
    this.tipPerPersonTextElement = tipPerPersonTextElement;
    this.totalAmountTextElement = totalAmountTextElement;
    this.billAmount = billAmount;
    this.numOfPeople = numOfPeople;
    this.billLabelInfo = billLabelInfo;
    this.numOfPeopleLabelInfo = numOfPeopleLabelInfo;
    this.bill_input = false;
    this.people_input = false;
    this.tip_input = false;
    this.resetAll();
    this.updateDisplay();
  }

  // A method to clear everything on the screen
  resetAll() {
    this.bill_amount = "0.00";
    this.tip_percentage = 0;
    this.tip_amount = "0.00";
    this.num_of_People = 1;
  }

  // This method will raise errors accordingly for each input element
  createErrorSpan() {
    let error_span = document.createElement("SPAN");
    error_span.setAttribute("name", "error-span");
    error_span.classList.add("input-error-message");
    return error_span;
  }

  // Gets and sets the percentage amount to be used for calculations
  getTipPercentage(tip_value) {
    let tip = parseFloat(tip_value);
    this.tip_percentage = 0;
    this.tip_percentage = tip / 100;

    if (
      this.tip_percentage != null &&
      this.tip_percentage != undefined &&
      this.tip_percentage != "NaN"
    ) {
      this.tip_input = true;
      return this.tip_percentage;
    } else {
      return (this.tip_percentage = 0);
    }
  }

  ValidateInputs(bill_amount, num_of_People) {
    // Creates error element
    let error_span = this.createErrorSpan();
    let bill_amount_error = "Enter a valid amount!";
    let num_of_people_error = "Cant be Zero!";

    /** VALIDATE BILL AMOUNT**/
    // Remove anything that isn't valid in a number
    bill_amount
      .replace(/[^\d-.]/g, "")
      // Remove all dashes unless it is the first character
      .replace(/(?!^)-/g, "")
      // Remove the last period if there is already one
      .replace(/(\..*)\.$/, "$1")
      // Remove all periods unless it is the last one
      .replace(/\.(?=.*\.)/g, "");

    if (isNaN(bill_amount)) {
      this.bill_input = false;

      //Add Error SPAN or THROW valid error text in existing SPAN element
      if (this.billLabelInfo.children.length > 1) {
        this.billLabelInfo.children.item(1).innerText = bill_amount_error;
        this.billAmount.classList.add("form-input-error");
      } else {
        error_span.innerText = bill_amount_error;
        this.billLabelInfo.appendChild(error_span);
        this.billAmount.classList.add("form-input-error");
      }

      //Inputted value NaN then set bill amount to zero!
      bill_amount = 0;
    } else {
      // Inputted amount is a valid number
      this.bill_input = true;

      // then remove all errors & error styles
      if (this.billLabelInfo.children.length > 1) {
        this.billLabelInfo.children.item(1).remove();
        this.billAmount.classList.remove("form-input-error");
      }
    }

    if (num_of_People == "") {
      console.log("DEFAULT: NUMBER OF PEOPLE is 1");
      if (this.numOfPeopleLabelInfo.children.length > 1) {
        this.numOfPeopleLabelInfo.children.item(1).remove();
        this.numOfPeople.classList.remove("form-input-error");
      }
      this.num_of_People = 1;
    } else if (isNaN(num_of_People) || num_of_People < 1) {
      this.people_input = false;

      if (this.numOfPeopleLabelInfo.children.length > 1) {
        this.numOfPeopleLabelInfo.children.item(1).innerText =
          num_of_people_error;
        this.numOfPeople.classList.add("form-input-error");
      } else {
        error_span.innerText = num_of_people_error;
        this.numOfPeopleLabelInfo.appendChild(error_span);
        this.numOfPeople.classList.add("form-input-error");
      }

      this.num_of_People = 1;
    } else {
      this.people_input = true;
      // This code removes SPAN element if exists
      if (this.numOfPeopleLabelInfo.children.length > 1) {
        this.numOfPeopleLabelInfo.children.item(1).remove();
        this.numOfPeople.classList.remove("form-input-error");
      }
    }

    return (
      (this.bill_amount = bill_amount), (this.num_of_People = num_of_People)
    );
  }

  //Updates the Total amount values per person
  updateDisplay() {
    //calculate the tip amount
    this.tip_amount =
      parseFloat(this.bill_amount) * parseFloat(this.tip_percentage);
    parseInt(this.num_of_People);

    // Reset Tip Amount
    if (
      (typeof this.tip_amount == "number" && this.tip_amount == "NaN") ||
      this.tip_amount == "0" ||
      this.tip_amount == null ||
      this.tip_amount == undefined
    ) {
      this.tipPerPersonTextElement.innerText = "0.00";
    }

    /* RESETS */
    if (
      this.bill_amount == "0.00" ||
      this.bill_amount == 0 ||
      this.billAmount.value == "" ||
      this.bill_amount == null ||
      this.bill_amount == undefined
    ) {
      // Display resets:
      this.tipPerPersonTextElement.innerText = "0.00";
      this.totalAmountTextElement.innerText = "0.00";
    } else if (
      this.num_of_People == "0" ||
      this.num_of_People == "NaN" ||
      this.num_of_People == "" ||
      this.num_of_People == null ||
      this.num_of_People == undefined
    ) {
      this.num_of_People = 1;
      this.tipPerPersonTextElement.innerText = this.tip_amount;
      this.totalAmountTextElement.innerText = this.bill_amount;
    } else if (this.bill_input && this.num_of_People >= "1") {
      console.log("SUCCESS!!!");
      this.tipPerPersonTextElement.innerText = (
        this.tip_amount / this.num_of_People
      ).toFixed(2);
      this.totalAmountTextElement.innerText = (
        (parseFloat(this.bill_amount) + parseFloat(this.tip_amount)) /
        this.num_of_People
      ).toFixed(2);
    }

    console.log("ClassBill-Value: " + this.bill_amount);
    console.log("formBill-Value: " + this.billAmount.value);

    console.log(this.num_of_People);

    //   / this.num_of_People).toFixed(2);
  }
}

// VARIABLES OF ELEMENTS

// These elements are in the left-side column
const billAmount = document.querySelector("[data-bill-amount]");
const tipPercentage = document.querySelectorAll("[data-tip-percentage]");
const customTip = document.querySelector("[data-custom-tip]");
const numOfPeople = document.querySelector("[data-num-people]");

// These elements are in the right-side column
const tipPerPersonTextElement = document.querySelector("[data-tip-amount]");
const totalAmountTextElement = document.querySelector("[data-total-amount]");
const resetButton = document.querySelector("[data-reset-button]");

// These label div containers will also hold the SPAN error element
const billLabelInfo = document.querySelector("[data-bill-label]");
const numOfPeopleLabelInfo = document.querySelector("[data-people-label]");

/**************************************************
 * THE APP RUNS FROM HERE WHEN THE OBJECT IS MADE *
 *************************************************/

// THE APP OBJECT
const splitMyBill = new SpiltTheBill(
  tipPerPersonTextElement,
  totalAmountTextElement,
  billAmount,
  numOfPeople,
  billLabelInfo,
  numOfPeopleLabelInfo
);

//EVENTS THAT TRIGGER THE APP
// Clears all values
resetButton.addEventListener("click", () => {
  splitMyBill.resetAll();
  splitMyBill.updateDisplay();
});

// Get the inputted bill amount from the form
billAmount.addEventListener("input", () => {
  splitMyBill.ValidateInputs(billAmount.value, numOfPeople.value);
  splitMyBill.updateDisplay();
});

// Get the tip percentage
tipPercentage.forEach((input) => {
  input.addEventListener("click", () => {
    splitMyBill.getTipPercentage(input.value);
    splitMyBill.updateDisplay();
  });
});

customTip.addEventListener("input", () => {
  splitMyBill.getTipPercentage(customTip.value);
  splitMyBill.updateDisplay();
});

// Get the inputted number of people from the form
numOfPeople.addEventListener("input", () => {
  splitMyBill.ValidateInputs(billAmount.value, numOfPeople.value);
  splitMyBill.updateDisplay();
});

// This code make it possible to increase number type inputs with mousewheel
window.onwheel = function () {};
