window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("filePath").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById("imageDisplay").src = reader.result;
    };
    reader.readAsDataURL(file);
  });

});
