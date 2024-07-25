const predefinedNames = [
    "Sameet Ikram",
    "Muhammad Muheet",
    "Umar Farooq",
    "Salik Imtiaz",
    "Adil Sir",
    "Armughan Sir",
    "Haris Ahmed",
    "Umme Jawaria",
    "Ateeq Ahmad",
    "Hamza Bilal",
    "Aiman Asif",
    "Fatima Mustafa",
    "Shumaim",
    "Ahmed Khan"
];

let peopleCount = 0;

function populateNamesDropdown() {
    const peopleOrders = document.getElementById('peopleOrders');
    const dropdown = document.createElement('select');
    dropdown.id = `person${peopleCount}`;
    dropdown.classList.add('person-dropdown');
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = 'Select Name';
    dropdown.appendChild(defaultOption);
    
    predefinedNames.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        dropdown.appendChild(option);
    });
    
    peopleOrders.appendChild(dropdown);
}

function addPerson() {
    const numPeople = parseInt(document.getElementById('numPeople').value);
    const peopleOrders = document.getElementById('peopleOrders');
    
    if (peopleCount < numPeople) {
        peopleCount++;
        
        const personDiv = document.createElement('div');
        personDiv.classList.add('person');
        
        const dropdownLabel = document.createElement('label');
        dropdownLabel.textContent = `Person ${peopleCount} Name:`;
        dropdownLabel.htmlFor = `person${peopleCount}`;
        
        populateNamesDropdown();
        
        const orderLabel = document.createElement('label');
        orderLabel.textContent = `Order Amount (Rs):`;
        orderLabel.htmlFor = `order${peopleCount}`;
        
        const orderInput = document.createElement('input');
        orderInput.type = 'number';
        orderInput.id = `order${peopleCount}`;
        orderInput.min = '0';
        orderInput.step = '0.01';
        orderInput.required = true;
        
        personDiv.appendChild(dropdownLabel);
        personDiv.appendChild(document.getElementById(`person${peopleCount}`));
        personDiv.appendChild(orderLabel);
        personDiv.appendChild(orderInput);
        peopleOrders.appendChild(personDiv);
    }
}

function clearValidationErrors() {
    document.querySelectorAll('.invalid-input').forEach(element => {
        element.classList.remove('invalid-input');
    });
    document.querySelectorAll('.invalid-feedback').forEach(element => {
        element.classList.remove('active');
    });
}

function validateInputs() {
    clearValidationErrors();

    let isValid = true;
    
    const numPeople = document.getElementById('numPeople');
    if (!numPeople.value || parseInt(numPeople.value) <= 0) {
        isValid = false;
        numPeople.classList.add('invalid-input');
        showValidationMessage(numPeople, 'Please enter a valid number of people.');
    }
    
    const deliveryCharges = document.getElementById('deliveryCharges');
    if (!deliveryCharges.value || parseFloat(deliveryCharges.value) < 0) {
        isValid = false;
        deliveryCharges.classList.add('invalid-input');
        showValidationMessage(deliveryCharges, 'Please enter valid delivery charges.');
    }
    
    const otherCharges = document.getElementById('otherCharges');
    if (!otherCharges.value || parseFloat(otherCharges.value) < 0) {
        isValid = false;
        otherCharges.classList.add('invalid-input');
        showValidationMessage(otherCharges, 'Please enter valid other charges.');
    }
    
    for (let i = 1; i <= peopleCount; i++) {
        const name = document.querySelector(`#person${i}`);
        const orderAmount = document.getElementById(`order${i}`);
        
        if (name.value === '') {
            isValid = false;
            name.classList.add('invalid-input');
            showValidationMessage(name, `Please select a name for person ${i}.`);
        }
        
        if (!orderAmount.value || parseFloat(orderAmount.value) < 0) {
            isValid = false;
            orderAmount.classList.add('invalid-input');
            showValidationMessage(orderAmount, `Please enter a valid order amount for person ${i}.`);
        }
    }
    
    return isValid;
}

function showValidationMessage(input, message) {
    let feedback = input.nextElementSibling;
    if (!feedback || !feedback.classList.contains('invalid-feedback')) {
        feedback = document.createElement('div');
        feedback.classList.add('invalid-feedback');
        input.parentNode.insertBefore(feedback, input.nextSibling);
    }
    feedback.textContent = message;
    feedback.classList.add('active');
}

function calculateBill() {
    if (!validateInputs()) {
        return;
    }

    const numPeople = parseInt(document.getElementById('numPeople').value);
    const deliveryCharges = parseFloat(document.getElementById('deliveryCharges').value);
    const otherCharges = parseFloat(document.getElementById('otherCharges').value);
    const includeGST = document.getElementById('includeGST').checked;
    
    const commonCharges = (deliveryCharges + otherCharges) / numPeople;
    
    let totalBill = 0;
    const results = document.getElementById('results');
    results.innerHTML = '';
    
    for (let i = 1; i <= numPeople; i++) {
        const name = document.querySelector(`#person${i}`).value;
        const orderAmount = parseFloat(document.getElementById(`order${i}`).value);
        
        const gstAmount = includeGST ? orderAmount * 0.15 : 0;
        const totalOrderAmount = orderAmount + gstAmount;
        const totalPersonBill = commonCharges + totalOrderAmount;
        
        totalBill += totalPersonBill;
        
        const result = document.createElement('p');
        result.textContent = `${name}'s Total Bill: Rs. ${totalPersonBill.toFixed(2)}`;
        results.appendChild(result);
    }
    
    const totalResult = document.createElement('p');
    totalResult.textContent = `Total Bill for Everyone: Rs. ${totalBill.toFixed(2)}`;
    results.appendChild(totalResult);
}