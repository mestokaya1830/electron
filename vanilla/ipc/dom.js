import { ipcRenderer } from "electron";

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  
 const name = document.getElementById('name')
 const age = document.getElementById('age')

  document.getElementById('btn').addEventListener('click', () => {
    ipcRenderer.send('form', {name:name.value, age: age.value})//get from window
  })

})