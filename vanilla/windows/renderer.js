document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  if(btn) {
    document.getElementById("btn").addEventListener("click", () => {
      window.api.getUsers();
    });
  }
  console.log("Renderer process initialized");
});
