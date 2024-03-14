const myForm = document.querySelector(".user-input");
myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const day = document.getElementById("day");
  const month = document.getElementById("month");
  const year = document.getElementById("year");
  const allErrors = document.querySelectorAll(".err");
  const allInputs = document.querySelectorAll("input");
  const allInputSections = document.querySelectorAll("p.input");
  const currentDate = new Date();
  year.setAttribute("max", currentDate.getFullYear());
  let inputsValidity = [];
  for (let i = 0; i < allInputs.length; i++) {
    if (!allInputs[i].validity.valid) {
      if (allInputs[i].validity.valueMissing) {
        allInputSections[i].classList.add("red");
        allInputs[i].classList.add("red-border");
        allErrors[i].textContent = "this field is required";
      } else if (
        allInputs[i].validity.rangeUnderflow ||
        allInputs[i].validity.patternMismatch
      ) {
        allInputSections[i].classList.add("red");
        allInputs[i].classList.add("red-border");
        allErrors[i].textContent = `must be a valid ${allInputs[i].id} `;
      } else if (allInputs[i].validity.rangeOverflow) {
        allInputSections[i].classList.add("red");
        allInputs[i].classList.add("red-border");
        allErrors[i].textContent = `must be a valid ${allInputs[i].id} `;
        if (year.validity.rangeOverflow) {
          const yearError = document.querySelector(".wrong-year");
          yearError.textContent = "Must be in the past";
        }
      }
      inputsValidity.push("invalid");
    } else {
      allErrors[i].textContent = "";
      allInputSections[i].classList.remove("red");
      allInputs[i].classList.remove("red-border");
      inputsValidity.push("valid");
    }
  }
  const dateOfBirth = new Date(year.value, month.value - 1, day.value);
  console.log(dateOfBirth);
  if (+day.value !== dateOfBirth.getDate()) {
    document.querySelector("p.day").classList.add("red");
    day.classList.add("red-border");
    document.querySelector(".wrong-day").textContent =
      "Must be a valid day";
  }

  if (inputsValidity.every((x) => x === "valid")) {
    const ageInMillseconds = Date.parse(currentDate) - Date.parse(dateOfBirth);
    let aYear = 365 * 24 * 60 * 60 * 1000;
    let aMonth = 30 * 24 * 60 * 60 * 1000;
    let aDay = 24 * 60 * 60 * 1000;
    const ageInYears = Math.floor(ageInMillseconds / aYear);
    const ageInMonths = Math.floor((ageInMillseconds - ageInYears * aYear) / aMonth);
    const ageInDays = Math.floor((ageInMillseconds - ((ageInYears * aYear) + (ageInMonths * aMonth))) / aDay)
    
    document.querySelector('.age-year .number').textContent = ageInYears
    document.querySelector('.age-month .number').textContent = ageInMonths
    document.querySelector('.age-day .number').textContent = ageInDays
  }
});
