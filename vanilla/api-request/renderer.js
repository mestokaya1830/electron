document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", async() => {
    const users = await window.api.getUsers()
    console.log(users)
  })
});
