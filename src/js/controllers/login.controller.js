import { createCookie } from '../utils/utils.js'
const $ = selector => document.querySelector(selector)

const user = $('#user')
const pass = $('#password')
const login = $('#login')

login.addEventListener('click', async () => {
  // eslint-disable-next-line no-var
  var isValid = await window.api.repositoryOperation('usuario', 'validateUser', user.value, pass.value)
  if (isValid) {
    createCookie('userType', user.value)
    createCookie('password', pass.value)
    window.location.href = 'menu.html'
  } else {
    window.alert('Usuario o contraseña incorrectos')
  }
})
