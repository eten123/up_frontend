const userContainer = document.querySelector("div.user-container");
function fetchUsers(){
    return fetch("http://127.0.0.1:3000/api/v1/users")
    .then(resp=> resp.json())
};

function displayAllUsers() {
    fetchUsers()
    .then(
        users => { users.forEach( user => {
        
        const p = document.createElement('p');
        const button = document.createElement("button")
        p.innerText = `${user.first_name} ${user.last_name}` 
        button.dataset.id = user.id;
        button.innerText = "delete";
        button.classList.add("deletes-button-user")
        userContainer.appendChild(p);
        userContainer.appendChild(button);

        }

    )}
    )
    json.forEach();
  }
userContainer.addEventListener("click", event => {
  console.log("click")
  if(event.target.matches("button.deletes-button-user")){
    const id = event.target.dataset.id
    const userName = event.target.previousElementSibling
    userName.remove();
    event.target.remove();
    const configurationObject =  {
      method: "delete" 
      }
  fetch("http://127.0.0.1:3000/api/v1/users", configurationObject)
  }
})

displayAllUsers();