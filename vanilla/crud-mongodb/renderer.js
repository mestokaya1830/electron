window.addEventListener("DOMContentLoaded", () => {
  //add new users
  document.getElementById("btn").addEventListener("click", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const result = await window.api.addNewUser({
        name: name,
        password: password,
      });
      if (!result.success) {
        document.getElementById('statusError').innerText = result.error
        return false
      }
      document.getElementById('statusError').innerText = ""
      document.getElementById("name").value = ""
      document.getElementById("password").value = ""
      loadUsers();
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Error adding user");
    }
  });

  //delete user
  document.getElementById("userList").addEventListener("click", async(e) => {
    if (e.target.classList.contains("delete-btn")) {
      const userId = e.target.id;
      const result = await window.api.deleteUser(userId);
      if(result.success){
        loadUsers()
      }
    }
  });

  //load users
  const loadUsers = async () => {
    try {
      const users = await window.api.getUsers()
      const userList = document.getElementById("userList");
      userList.innerHTML = "";
  
      if (!users || users.length === 0) {
        const li = document.createElement("li");
        li.textContent = "No users found";
        userList.appendChild(li);
      }
  
      users.forEach((item) => {
        const userId = Array.from(item._doc._id.buffer)
          .map((item) => item.toString(16).padStart(2, "0"))
          .join("");
        userList.innerHTML += `
        <li class="users-list">
        <span>${item.name || item._doc?.name}</span>
        <span>${item.password || item._doc?.password}</span>
        <button class="delete-btn" id="${userId}">Delete</button>
        </li>`;
      });
    } catch (error) {
      console.log(error)
    }
  };

  loadUsers();
});
