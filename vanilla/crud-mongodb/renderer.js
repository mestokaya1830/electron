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
  });

  // window.api.messageReplyListen((message) => {
  //   console.log(message); // Display the message received from the main process
  // });
});
