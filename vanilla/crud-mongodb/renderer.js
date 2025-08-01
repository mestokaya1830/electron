
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    if (!name || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Assuming window.api.addUser is a function to add a user
    window.api.addUser({ name: name, password: password });
    // Listen for the result from the main process
    window.api.insertResult((message) => {
      if(message == 'User added successfully'){
        alert("User added successfully");
        document.getElementById("name").value = '';
        document.getElementById("password").value = '';
         window.api.getUsers();
      } // Display the message received from the main process
    });
  });

  window.api.getUsers(); 
  window.api.usersResult((users) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = ''; // Clear existing list
    users.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item._doc.name} - ${item._doc.password}`;
      userList.appendChild(li);
    });
  });
});
