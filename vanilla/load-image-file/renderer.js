window.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("filePath");
  const imageDisplay = document.getElementById("imageDisplay");
  const saveBtn = document.getElementById("saveBtn");

  let currentBase64 = null;

  //load image
  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      currentBase64 = reader.result;
      imageDisplay.src = currentBase64;
    };
    reader.readAsDataURL(file);
  });

  //save image
  saveBtn.addEventListener("click", async () => {
    if (!currentBase64) return alert("No image selected!");
    const savedPath = await window.api.saveImage(currentBase64, "saved.png");
    if (savedPath) alert(`Image saved: ${savedPath}`);
    else alert("Image could not be saved!");
  });
});
