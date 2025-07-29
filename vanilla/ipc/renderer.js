document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("btn").addEventListener("click", () => {
    window.api.sendMessage("From Renderer: Hello Main Process!");
  });

  window.api.messageReplyListen((antwort) => {
    document.getElementById("result").innerText = antwort;
  });
});
