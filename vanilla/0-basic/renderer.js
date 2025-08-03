window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('getMessage').addEventListener('click', async() => {
    const message = await window.api.getMessage()
    console.log(message)
  })
})