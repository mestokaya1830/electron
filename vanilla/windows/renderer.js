document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  if (btn) {
    document.getElementById("btn").addEventListener("click", () => {
      window.api.getUsersWindow();
    });
  }
})
