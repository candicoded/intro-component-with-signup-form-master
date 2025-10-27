const firstNameInput = document.getElementById("first-name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const submitBtn = document.getElementById("submit-btn");

const firstNameError = document.getElementById("first-name-error");
const lastNameError = document.getElementById("last-name-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");

const inputs = [
  { input: firstNameInput, error: firstNameError, message: "First Name cannot be empty" },
  { input: lastNameInput, error: lastNameError, message: "Last Name cannot be empty" },
  { input: emailInput, error: emailError, message: "Looks like this is not an email" },
  { input: passwordInput, error: passwordError, message: "Password cannot be empty" },
];

// Hide all error messages initially
inputs.forEach(({ error }) => {
  error.style.display = "none";
});

submitBtn.addEventListener("click", (event) => {
  event.preventDefault();

  inputs.forEach(({ input, error, message }) => {
    const value = input.value.trim();

    if (value === "") {
      input.classList.add("error");
      error.textContent = message;
      error.style.display = "block";

      // Change placeholder to error message & make it red
      input.value = "";
      input.placeholder = message;
      input.classList.add("error-placeholder");
    } else {
      input.classList.remove("error");
      error.style.display = "none";
      input.classList.remove("error-placeholder");
      resetPlaceholder(input);
    }
  });

  // Email format validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailInput.value.trim() !== "" && !emailPattern.test(emailInput.value.trim())) {
    emailInput.classList.add("error");
    emailError.textContent = "Looks like this is not an email";
    emailError.style.display = "block";
    emailInput.value = "";
    emailInput.placeholder = "email@example/com";
    emailInput.classList.add("error-placeholder");
  }
});

// Reset placeholder to default text
function resetPlaceholder(input) {
  switch (input.id) {
    case "first-name-input":
      input.placeholder = "First Name";
      break;
    case "last-name-input":
      input.placeholder = "Last Name";
      break;
    case "email-input":
      input.placeholder = "Email Address";
      break;
    case "password-input":
      input.placeholder = "Password";
      break;
  }
}

// Remove error message as user types
inputs.forEach(({ input, error }) => {
  input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
      input.classList.remove("error");
      input.classList.remove("error-placeholder");
      error.style.display = "none";
      resetPlaceholder(input);
    }
  });
});
