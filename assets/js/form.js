// (1) Variablen initialisieren
const formContainer = document.querySelector(".mainContainer");
const submitButton = document.getElementById("submit");
submitButton.disabled = true;
const emailField = document.getElementById("email");
const vornameField = document.getElementById("vorname");
const nachnameField = document.getElementById("nachname");
const telField = document.getElementById("tel");

// (2) Interaktionen festlegen
emailField.addEventListener("keyup", () => {
  onChangeEmailField();
});
telField.addEventListener("keyup", () => {
  validatePhoneNumber();
});
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();
  onClickSubmit();
});

// (3) Interaktionen Code
const onChangeEmailField = () => {
  if (emailField.value === "") {
    submitButton.disabled = true;
  } else {
    submitButton.disabled = false;
  }
};

const validatePhoneNumber = () => {
  const phoneNumber = telField.value;
  const phoneNumberPattern = /^\+\d{2}\s\d{2}\s\d{3}\s\d{2}\s\d{2}$/; // Annahme: Telefonnummer im Format "+41 00 000 00 00"

  if (!phoneNumberPattern.test(phoneNumber)) {
    telField.classList.add("invalid");
    submitButton.disabled = true;
  } else {
    telField.classList.remove("invalid");
    submitButton.disabled = false;
  }
};

const onClickSubmit = async () => {
  // Daten aus dem Formular für die Datenbank bereitstellen
  const data = {
    group: "cl1", // SQL Gruppen Namen
    pw: "0c47e23a", // SQL Passwort
    tableName: "user", // Name der Tabelle in der SQL Datenbank

    columns: {
      email: emailField.value,
      vorname: vornameField.value,
      nachname: nachnameField.value,
      telnr: telField.value,
    },
  };
  // Speichert die Daten in der Datenbank
  await databaseClient.insertInto(data);

  // Nach dem Speichern verschwindet das Formular, eine Dankeschön Nachricht erscheint
  formContainer.classList.add("hidden");
  thankYouContainer.classList.remove("hidden");
};

// Initialisierung der Telefonnummervalidierung
validatePhoneNumber();
