document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", () => {
    window.api.getUsers()
  });
  window.api.dataReturn((data) => {
    data.forEach(item => {
      document.getElementById("result").innerText += item.name + "\n";
    });
  });
});
