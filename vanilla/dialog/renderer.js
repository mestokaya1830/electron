document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn");
  if(btn) {
    document.getElementById("btn").addEventListener("click", () => {
      window.api.openDialog();
    });
  }
  console.log("Renderer process initialized");
});
