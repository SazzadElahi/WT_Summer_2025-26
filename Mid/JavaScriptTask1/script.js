// ===================================================
// THEME SWITCHER (Dark / Light Mode)
// ===================================================
function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ===================================================
// LIVE CLOCK AND GREETING
// ===================================================
function updateClock() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // add a leading zero if needed
  if (minutes < 10) { minutes = "0" + minutes; }
  if (seconds < 10) { seconds = "0" + seconds; }

  document.getElementById("clock").textContent = hours + ":" + minutes + ":" + seconds;

  // set greeting based on the hour
  var greetingText = "";
  if (hours < 12) {
    greetingText = "Good Morning!";
  } else if (hours < 18) {
    greetingText = "Good Afternoon!";
  } else {
    greetingText = "Good Evening!";
  }
  document.getElementById("greeting").textContent = greetingText;
}

updateClock(); // run once right away
setInterval(updateClock, 1000); // then run every second

// ===================================================
// CONTACT FORM VALIDATION
// ===================================================
var form = document.getElementById("contactForm");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the form from submitting normally

  // get all the input values
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var password = document.getElementById("password").value;
  var age = document.getElementById("age").value;
  var message = document.getElementById("message").value;

  // run each check, keep track if everything is valid
  var isValid = true;

  if (!checkName(name)) { isValid = false; }
  if (!checkEmail(email)) { isValid = false; }
  if (!checkPhone(phone)) { isValid = false; }
  if (!checkPassword(password)) { isValid = false; }
  if (!checkAge(age)) { isValid = false; }
  if (!checkMessage(message)) { isValid = false; }

  // if everything passed, show the success message
  if (isValid) {
    document.getElementById("outName").textContent = name;
    document.getElementById("outEmail").textContent = email;
    document.getElementById("outPhone").textContent = phone;
    document.getElementById("outAge").textContent = age;
    document.getElementById("outMessage").textContent = message;

    form.style.display = "none";
    document.getElementById("successMessage").style.display = "block";
  }
});

// ---------------------------------------------------
// Name: only letters and spaces, minimum 3 characters
// ---------------------------------------------------
function checkName(name) {
  var errorBox = document.getElementById("nameError");
  var letterPattern = /^[A-Za-z ]+$/;

  if (name.trim() === "") {
    errorBox.textContent = "Name is required.";
    return false;
  }
  if (!letterPattern.test(name)) {
    errorBox.textContent = "Name can only have letters and spaces.";
    return false;
  }
  if (name.trim().length < 3) {
    errorBox.textContent = "Name must be at least 3 characters.";
    return false;
  }

  errorBox.textContent = ""; // no error, clear the message
  return true;
}

// ---------------------------------------------------
// Email: must look like a valid email address
// ---------------------------------------------------
function checkEmail(email) {
  var errorBox = document.getElementById("emailError");
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email.trim() === "") {
    errorBox.textContent = "Email is required.";
    return false;
  }
  if (!emailPattern.test(email)) {
    errorBox.textContent = "Please enter a valid email.";
    return false;
  }

  errorBox.textContent = "";
  return true;
}

// ---------------------------------------------------
// Phone: exactly 10 digits
// ---------------------------------------------------
function checkPhone(phone) {
  var errorBox = document.getElementById("phoneError");
  var phonePattern = /^[0-9]{10}$/;

  if (phone.trim() === "") {
    errorBox.textContent = "Phone number is required.";
    return false;
  }
  if (!phonePattern.test(phone)) {
    errorBox.textContent = "Phone number must be exactly 10 digits.";
    return false;
  }

  errorBox.textContent = "";
  return true;
}

// ---------------------------------------------------
// Password: min 8 characters, 1 uppercase, 1 lowercase,
// 1 number, 1 special character
// ---------------------------------------------------
function checkPassword(password) {
  var errorBox = document.getElementById("passwordError");

  if (password === "") {
    errorBox.textContent = "Password is required.";
    return false;
  }
  if (password.length < 8) {
    errorBox.textContent = "Password must be at least 8 characters.";
    return false;
  }
  if (!/[A-Z]/.test(password)) {
    errorBox.textContent = "Password needs at least 1 uppercase letter.";
    return false;
  }
  if (!/[a-z]/.test(password)) {
    errorBox.textContent = "Password needs at least 1 lowercase letter.";
    return false;
  }
  if (!/[0-9]/.test(password)) {
    errorBox.textContent = "Password needs at least 1 number.";
    return false;
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errorBox.textContent = "Password needs at least 1 special character.";
    return false;
  }

  errorBox.textContent = "";
  return true;
}

// ---------------------------------------------------
// Age: must be 18 or older
// ---------------------------------------------------
function checkAge(age) {
  var errorBox = document.getElementById("ageError");

  if (age.trim() === "") {
    errorBox.textContent = "Age is required.";
    return false;
  }
  if (isNaN(age)) {
    errorBox.textContent = "Age must be a number.";
    return false;
  }
  if (Number(age) < 18) {
    errorBox.textContent = "You must be 18 or older.";
    return false;
  }

  errorBox.textContent = "";
  return true;
}

// ---------------------------------------------------
// Message: minimum 10 characters
// ---------------------------------------------------
function checkMessage(message) {
  var errorBox = document.getElementById("messageError");

  if (message.trim() === "") {
    errorBox.textContent = "Message is required.";
    return false;
  }
  if (message.trim().length < 10) {
    errorBox.textContent = "Message must be at least 10 characters.";
    return false;
  }

  errorBox.textContent = "";
  return true;
}

// ===================================================
// BONUS: remove the error message as soon as the user
// fixes the field (runs the same check while typing)
// ===================================================
document.getElementById("name").addEventListener("input", function () {
  checkName(this.value);
});
document.getElementById("email").addEventListener("input", function () {
  checkEmail(this.value);
});
document.getElementById("phone").addEventListener("input", function () {
  checkPhone(this.value);
});
document.getElementById("password").addEventListener("input", function () {
  checkPassword(this.value);
});
document.getElementById("age").addEventListener("input", function () {
  checkAge(this.value);
});
document.getElementById("message").addEventListener("input", function () {
  checkMessage(this.value);
});
