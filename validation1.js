
const form = document.getElementById('form');
const uname = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const cpassword = document.getElementById('cpassword');
const tandc = document.getElementById("tc");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate();
});

function validate() {
    let namevalue = uname.value.trim();
    let emailvalue = email.value.trim();
    let passwordvalue = password.value.trim();
    let cpasswordvalue = cpassword.value.trim();

    let isValidName = false;
    let isValidEmail = false;
    let isValidPassword = false;
    let isValidCPassword = false;
    let isTCChecked = false;

    // Username check
    if (namevalue === "") {
        setError(uname, "User name cannot be empty");
    } else if (namevalue.length < 3) {
        setError(uname, 'User name should be at least 3 characters');
    } else {
        setSuccess(uname);
        isValidName = true;
    }

    // Email check
    if (emailvalue === '') {
        setError(email, 'Email cannot be empty');  
    } else if (!emailcheck(emailvalue)) {
        setError(email, 'Enter a valid Email Id');
    } else {
        setSuccess(email);
        isValidEmail = true;
    }

    // Password check
    if (passwordvalue === "") {
        setError(password, 'Password cannot be empty');
    } else if (passwordvalue.length < 8) {
        setError(password, 'Password must be at least 8 characters');
    } else {
        setSuccess(password);
        isValidPassword = true;
    }

    // Confirm password check
    if (cpasswordvalue === "") {
        setError(cpassword, 'Confirm Password cannot be empty');
    } else if (cpasswordvalue !== passwordvalue) {
        setError(cpassword, 'Passwords do not match');
    } else {
        setSuccess(cpassword);
        isValidCPassword = true;
    }

    // Terms and conditions check
    if (!tandc.checked) {
        setError(tandc, 'Please agree to the terms and conditions');
    } else {
        setSuccess(tandc);
        isTCChecked = true;
    }

    // If all validations pass
    if (isValidName && isValidEmail && isValidPassword && isValidCPassword && isTCChecked) {
        saveToLocalStorage(namevalue, emailvalue); // Only save name and email
        // alert("Registration successful!");
        form.submit();  // Submit form or redirect as needed
    }
}

// Local storage function (without password)
function saveToLocalStorage(name, email) {
    const userData = {
        username: name,
        email: email,
        password:password
    };
    localStorage.setItem('user', JSON.stringify(userData));
}

// Set error message
function setError(input, message) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    small.innerText = message;
    parent.classList.add('error');
    parent.classList.remove('success');
}

// Set success state
function setSuccess(input) {
    let parent = input.parentElement;
    let small = parent.querySelector('small');
    small.innerText = ''; // Clear any previous error message
    parent.classList.add('success');
    parent.classList.remove('error');
}

// Email validation
function emailcheck(input) {
    let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailReg.test(input);
}

// Populate fields from local storage (without password)
window.addEventListener('DOMContentLoaded', () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
        uname.value = userData.username;
        email.value = userData.email;
        password.value=userData.password;
    }
});

