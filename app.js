var bill_amount, num_of_people, tip_amount, tip, total_amount;

let resetBtn = document.getElementById('resetBtn').addEventListener('click', resetAll);

function resetAll() {
    let tip_amount = document.getElementById('tip-amount');
    tip_amount.textContent = 0.00;

    let total =  document.getElementById('total-amount');
    total.textContent = 0.00;

    let bill = document.getElementById('bill-amount');
    bill.value = '';

    let people = document.getElementById('people-num');
    people.value = '';

}

function get_bill(event){
    let bill = event.target.value;
    return bill;
}

function get_people_num(event){
    let people = event.target.value;
    return people;
}

function get_tip_percentage(event) {
    var tip = event.target.textContent;

    /* Assign the tip percentage */
    switch(tip) {
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
    return tip_percentage;
}


bill_amount = document.getElementById('bill-amount');
bill_amount.addEventListener('change', function(event){
    let bill_amount = get_bill(event);
    console.log(`Bill amount is: ${bill_amount}`);
    return bill_amount;
});

tip = 0;
tip = document.querySelector('#tip-selector').addEventListener('click', function(event){
    let tip = get_tip_percentage(event);
    console.log(`The Tip is: ${tip*100}%`);
    return tip
});


tip_amount =  document.getElementById('tip-amount');
tip_amount.textContent = (tip * bill_amount) / num_of_people;


total_amount =  document.getElementById('total-amount');
total_amount.textContent = (tip_amount + bill_amount) / num_of_people;

/* Check if the bill amount exists or greater than 0 */
if (bill_amount == '' || bill_amount == '0') {
    bill_amount.setCustomValidity('Enter a valid bill amount');
    total_amount.textContent = 0.00;
    tip_amount.textContent = 0.00

}

/* Check if number of people is greater than 0 */
if (num_of_people == '' || num_of_people == '0') {
    bill.setCustomValidity("Can't be Zero!");
}

















