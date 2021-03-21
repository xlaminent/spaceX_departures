
const name = document.querySelector("#name");
name.addEventListener("keyup", nameListner);
name.addEventListener("focusout", nameListner);

const email = document.querySelector("#email");
email.addEventListener("keyup", emailListner);
email.addEventListener("focusout", emailListner);

const subject = document.querySelector("#subject");
subject.addEventListener("keyup", subjectListner);
subject.addEventListener("focusout", subjectListner);

const inquiry = document.querySelector("#inquiry");
inquiry.addEventListener("keyup", inquiryListner);
inquiry.addEventListener("focusout", inquiryListner);

function nameListner(event) {
    const nameInput = event.target;
    const nameError = document.querySelector("#name-error");
    showError(inputCheck(nameInput), nameError);
}

function emailListner(event) {
    const emailInput = event.target;
    const emailError = document.querySelector("#email-error");
    const invalidEmailError = document.querySelector("#invalid-email-error");
    showError(inputCheck(emailInput), emailError);
    showError(emailReqEx(emailInput), invalidEmailError);
};

function subjectListner(event) {
    const subjectInput = event.target;
    const subjectError = document.querySelector("#subject-error");
    showError(inputCheck(subjectInput), subjectError);
};

function inquiryListner(event) {
    const inquiryInput = event.target;
    const inquiryError = document.querySelector("#inquiry-error");

    if (isTextValid(inquiryInput, 30) === true) {
        inquiryError.style.display = "none";
    } else {
        inquiryError.style.display = "inline-block";
    }
};

function showError(validationResult, element) {
    element.style.display = (validationResult === false) ? "inline-block" : "none";
}

function inputCheck(element) {
    const inputValue = element.value.trim();
    const isValid = inputValue.length > 0;
    setValidation(element, isValid);
    isFormValid();

    return isValid;
}

function emailReqEx(element) {
    const email = element.value.trim();
    const regEx = /\S+@\S+\.\S+/;
    const isValid = regEx.test(email);
    setValidation(element, isValid);
    isFormValid();

    return isValid;
}

function isTextValid(element, minValue) {
    const trimmedValue = element.value.trim();
    const isValid = trimmedValue.length >= minValue;
    setValidation(element, isValid);
    isFormValid();

    return isValid;
}

function setValidation(element, isValid) {

    if (isValid)
    {
        element.classList.add("valid");
    }
    else {
        element.classList.remove("valid");
    }
}

function isFormValid() {
    const inputValCheck = document.querySelectorAll(".form-control"); 
    const submitBtn = document.querySelector("#submit");

    for (let i = 0; i < inputValCheck.length; i++) {
        if (!inputValCheck[i].classList.contains("valid")) {
            submitBtn.disabled = true;
            return;
        }
    }
    submitBtn.disabled = false;
}