window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!name || !password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const result = await window.api.addNewUser({name: name, password: password});
      console.log("User added:", result);
      if (!result.success) {
        alert("Error adding user: " + result.error);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  });

  window.api.newUserStatus((data) => {
    console.log("New user status:", data);
    if (data.message === "User added successfully") {
      alert("User added successfully");
      document.getElementById("name").value = "";
      document.getElementById("password").value = "";
      loadUsers();
    }
  });

  const loadUsers = async () => {
    try {
      const users = await window.api.getUsers();
      updateUserList(users);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  const updateUserList = (users) => {
    const userList = document.getElementById("userList");
    userList.innerHTML = "";

    if (!users || users.length === 0) {
      const li = document.createElement("li");
      li.textContent = "No users found";
      userList.appendChild(li);
      return;
    }

    users.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name || item._doc?.name} - ${
        item.password || item._doc?.password
      }`;
      userList.appendChild(li);
    });
  };
  
  loadUsers();

  window.api.getUsersStatus((users) => {
    updateUserList(users);
  });
});
