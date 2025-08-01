
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    if (!name || !password) {
      alert("Please fill in all fields.");
      return;
    }
// add new user
    window.api.addNewUser({ name: name, password: password });
    window.api.newUserStatus((message) => {
      if(message == 'User added successfully'){
        alert("User added successfully");
        document.getElementById("name").value = '';
        document.getElementById("password").value = '';
         window.api.getUsers();
      }
    });
  });

//get users
  window.api.getUsers(); 
  window.api.getUsersStatus((users) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = '';
    users.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item._doc.name} - ${item._doc.password}`;
      userList.appendChild(li);
    });
  });
});
