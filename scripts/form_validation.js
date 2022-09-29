const form = document.querySelector(".bio-form");

const fullNameInput = form.querySelector(".name-field input");
const fullNameInputError = form.querySelector(".name-field .error");

const genderInput = form.querySelector(".gender-field select");
const genderInputError = form.querySelector(".gender-field .error");

const countryInput = form.querySelector(".country-field input");
const countryInputError = form.querySelector(".country-field .error");

const cityInput = form.querySelector(".city-field input");
const cityInputError = form.querySelector(".city-field .error");

const birthDateInput = form.querySelector(".date-field input");
const birthDateInputError = form.querySelector(".date-field .error");

const submitButton = form.querySelector(".submit button");
const formCompleted = form.querySelector(".form-completed");

function convertDate(dateStr) {
    const date = new Date(Date.parse(dateStr));
    return date.toLocaleDateString("ru-RU");
}

function validateTextInput(input, error) {

    if (input.validity.valid) {
        error.textContent = "";
        return true;
    }
    else {
        if (input.validity.valueMissing) {
            error.textContent = "Поле должно быть заполнено";
        }
        else if (input.validity.tooShort) {
            error.textContent = `Поле должно содержать минимум ${input.minLength} символа, введено ${input.value.length}`;
        }
        else if (input.validity.tooLong) {
            error.textContent = `Поле должно содержать максимум ${input.maxLength} символа, введено ${input.value.length}`;
        }
        return false;
    }
}

function validateDateInput(input, error) {
    if (input.validity.valid) {
        error.textContent = "";
        return true;
    }
    else {
        if (input.validity.valueMissing) {
            error.textContent = "Поле должно быть заполнено";
        }
        else if (input.validity.rangeUnderflow) {
            error.textContent = `Минимальное значение для поля ${convertDate(input.min)}, введено ${convertDate(input.value)}`;
        }
        else if (input.validity.rangeOverflow) {
            error.textContent = `Максимальное значение для поля ${convertDate(input.max)}, введено ${convertDate(input.value)}`;
        }
        return false;
    }
}

function validateForm(event) {
    const validFullName = validateTextInput(fullNameInput, fullNameInputError);
    const validGender = validateTextInput(genderInput, genderInputError);
    const validCountry = validateTextInput(countryInput, countryInputError);
    const validCity = validateTextInput(cityInput, cityInputError);
    const validBirthDate = validateDateInput(birthDateInput, birthDateInputError);
    if (validFullName && validGender && validCountry && validCity && validBirthDate) {
        submitButton.classList.remove("inactive");
        submitButton.classList.add("active");
        formCompleted.style.visibility = "visible";
    }
    else {
        submitButton.classList.add("inactive");
        submitButton.classList.remove("active");
        formCompleted.style.visibility = "hidden";
        event.preventDefault();
    }
}

function onSubmit() {
    if (!fullNameInput.validity.valid) {
        fullNameInput.focus();
        return;
    }
    if (!genderInput.validity.valid) {
        genderInput.focus();
        return;
    }
    if (!countryInput.validity.valid) {
        countryInput.focus();
        return;
    }
    if (!cityInput.validity.valid) {
        cityInput.focus();
        return;
    }
    if (!birthDateInput.validity.valid) {
        birthDateInput.focus();
        return;
    }

    form.submit();
}

form.addEventListener('change', validateForm);
submitButton.addEventListener('click', onSubmit);
