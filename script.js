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
    const dropdown = document.createElement('select');
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
    
    return dropdown;
}

function addPerson() {
    const peopleOrders = document.getElementById('peopleOrders');
    
    peopleCount++;
    
    const personDiv = document.createElement('div');
    personDiv.classList.add('person');
    
    const dropdownLabel = document.createElement('label');
    dropdownLabel.textContent = `Person ${peopleCount} Name:`;
    dropdownLabel.htmlFor = `person${peopleCount}`;
    
    const dropdown = populateNamesDropdown();
    dropdown.id = `person${peopleCount}`;
    
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
    personDiv.appendChild(dropdown);
    personDiv.appendChild(orderLabel);
    personDiv.appendChild(orderInput);
    peopleOrders.appendChild(personDiv);
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
    
    if (peopleCount === 0) {
        isValid = false;
        showValidationMessage(document.getElementById('peopleOrders'), 'Please add at least one person.');
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

    const deliveryCharges = parseFloat(document.getElementById('deliveryCharges').value);
    const otherCharges = parseFloat(document.getElementById('otherCharges').value);
    const gstRate = parseFloat(document.getElementById('gstRate').value);
    
    const commonCharges = (deliveryCharges + otherCharges) / peopleCount;
    
    let totalBill = 0;
    const results = document.getElementById('results');
    results.innerHTML = '';
    
    for (let i = 1; i <= peopleCount; i++) {
        const name = document.querySelector(`#person${i}`).value;
        const orderAmount = parseFloat(document.getElementById(`order${i}`).value);
        
        const gstAmount = orderAmount * gstRate;
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

function resetForm() {
    // Clear people count and reset the people orders section
    peopleCount = 0;
    const peopleOrders = document.getElementById('peopleOrders');
    peopleOrders.innerHTML = '';

    // Clear other input fields
    document.getElementById('deliveryCharges').value = '';
    document.getElementById('otherCharges').value = '';
    document.getElementById('gstRate').value = '0';

    // Clear results
    document.getElementById('results').innerHTML = '';

    // Remove validation errors
    clearValidationErrors();
}