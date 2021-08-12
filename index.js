
document.addEventListener('DOMContentLoaded', function() {
    fetchBrands();
  });


function fetchBrands(){
    const brand = fetch("http://127.0.0.1:3000/api/v1/brands")
    .then(resp=> resp.json())
    .then(json=>displayAllBrands(json));
};

function displayAllBrands(json) {
    const aside = document.querySelector("aside");
    json.forEach(brand => {
      const p = document.createElement('p');
      const button = document.createElement("button")
      p.innerText = brand.name;
      button.dataset.id = brand.id;
      button.innerText = "delete";
      button.classList.add("deletes-button")
      aside.appendChild(p);
      aside.appendChild(button);
    });
  }

const aside = document.querySelector("aside");
aside.addEventListener("click", event => {
  console.log("click")
  if(event.target.matches("button.deletes-button")){
    const id = event.target.dataset.id
    const brandName = event.target.previousElementSibling
    brandName.remove();
    event.target.remove();
    const configurationObject =  {
      method: "delete" 
      }
  fetch("http://127.0.0.1:3000/api/v1/brands", configurationObject)
  }
})



  const form = document.querySelector("#form1");
  form.addEventListener('submit', addNewBrand);

function addNewBrand(event) {
    event.preventDefault()
    // make sure that I am looking for a buttton submit)
    const name = form.querySelector("input").value
    
    //create corect Event Listener
    const configurationObject =  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        brand: name
      })}
  fetch("http://127.0.0.1:3000/api/v1/brands", configurationObject)
  .then(resp=>resp.json())
  .then(resp=>displayNewBrand(resp));
  
  
    //to save the data to the database I have to use a post method to add the new user to the database
  };


function displayNewBrand(resp) {
  const aside = document.querySelector("aside");
  const p = document.createElement('p');
  p.innerText = resp.name;
  aside.appendChild(p);
  
}


const newAccount = document.querySelector("#createAccount");
form.addEventListener('submit', addNewBrand);

function addNewBrand(event) {
  event.preventDefault()
  const name = form.querySelector("input").value
  const configurationObject =  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      brand: name
    })}
fetch("http://127.0.0.1:3000/api/v1/brands", configurationObject)
.then(resp=>resp.json())
.then(resp=>displayNewBrand(resp));
};



function setFormMessage(formElement, type, message) {
  const messageElement = formElement.querySelector(".form__message");

  messageElement.textContent = message;
  messageElement.classList.remove("form__message--success", "form__message--error");
  messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
  inputElement.classList.add("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
  inputElement.classList.remove("form__input--error");
  inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login");
  const createAccountForm = document.querySelector("#createAccount");

  document.querySelector("#linkCreateAccount").addEventListener("click", e => {
      e.preventDefault();
      loginForm.classList.add("form--hidden");
      createAccountForm.classList.remove("form--hidden");
  });

  // document.querySelector("#linkLogin").addEventListener("click", e => {
  //     e.preventDefault();
  //     loginForm.classList.remove("form--hidden");
  //     createAccountForm.classList.add("form--hidden");
  // });

  // loginForm.addEventListener("submit", e => {
  //     e.preventDefault();

  //     // Perform your AJAX/Fetch login


  //     setFormMessage(loginForm, "error", "Invalid username/password combination");
  // });



createAccountForm.addEventListener("submit", e => {
    e.preventDefault();

    // Perform your AJAX/Fetch login
    const firstName = e.target[0].value
    const lastName = e.target[1].value
    const age = e.target[2].value
    console.log(firstName, lastName, age)
    const configurationObject =  {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      age: age
      })}
  fetch("http://127.0.0.1:3000/api/v1/users", configurationObject)
  .then(resp=>resp.json())
  .then(resp=>console.log(resp));
  


    setFormMessage(loginForm, "error", "Invalid username/password combination");
});

  document.querySelectorAll(".form__input").forEach(inputElement => {
      inputElement.addEventListener("blur", e => {
          if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
              setInputError(inputElement, "Username must be at least 10 characters in length");
          }
      });

      inputElement.addEventListener("input", e => {
          clearInputError(inputElement);
      });
  });
});