
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }

  const imageFile = document.getElementById("imageFile");
  const imageForm = document.getElementById("imageForm");
  const imageWidth = document.getElementById("imageWidth");
  const imageHeight = document.getElementById("imageHeight");
  const outputLabel = document.getElementById("output");
  const saveBtn = document.getElementById('saveBtn')

  function loadImage(e) {
    const file = e.target.files[0];
    console.log(file['type']);
    if (!checkImageType(file)) {
      console.log("This is not an image");
      return;
    }

    //get original image dimensions
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      imageWidth.value = img.width;
      imageHeight.value = img.height;
    }
    console.log(imageWidth.value, imageHeight.value);
    imageForm.style.display = "block";
  }

  function checkImageType(file) {
    const imageType = ["image/gif", "image/png", "image/jpg", "image/jpeg"];
    return file && imageType.includes(file["type"]);
  }

  function saveImage(e) {
    e.preventDefault();
    console.log('saved')
  }
  imageFile.addEventListener("change", loadImage);
  saveBtn.addEventListener('click', saveImage)
});
