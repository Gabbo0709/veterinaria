import { getQueryParam, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const veterinarioCurp = getQueryParam('curp')
let user = ''
let pass = ''

// HTML elements
const curpVeterinario = $('#curp-veterinario')
const nombreVeterinario = $('#nombre-veterinario')
const telefonoVeterinario = $('#telefono-veterinario')
const direccionVeterinario = $('#direccion-veterinario')
const rfcVeterinario = $('#rfc-veterinario')
const nssVeterinario = $('#nss-veterinario')
const especialidadVeterinario = $('#especialidad-veterinario')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch veterinario data
const fetchVeterinarioData = async () => {
  const veterinario = await window.api.repositoryOperation('veterinario', 'getVeterinario', user, pass, veterinarioCurp)
  return JSON.parse(JSON.stringify(veterinario))
}

// Render veterinario data
const renderVeterinarioData = async () => {
  const veterinario = await fetchVeterinarioData()
  curpVeterinario.value = veterinario.curp
  nombreVeterinario.value = veterinario.nombre
  telefonoVeterinario.value = veterinario.telefono
  direccionVeterinario.value = veterinario.direccion
  rfcVeterinario.value = veterinario.rfc
  nssVeterinario.value = veterinario.nss
  especialidadVeterinario.value = veterinario.especialidad
}

// Update veterinario
const updateVeterinario = async () => {
  const veterinario = {
    curp: curpVeterinario.value,
    nombre: nombreVeterinario.value,
    telefono: telefonoVeterinario.value,
    direccion: direccionVeterinario.value,
    rfc: rfcVeterinario.value,
    nss: nssVeterinario.value,
    especialidad: especialidadVeterinario.value
  }
  const updated = await window.api.repositoryOperation('veterinario', 'update', user, pass, veterinario)
  if (updated) { window.alert('Veterinario correctamente actualizado') } else { window.alert('Error al actualizar el veterinario') }
}

// Create veterinario
const createVeterinario = async () => {
  const veterinario = {
    curp: curpVeterinario.value,
    nombre: nombreVeterinario.value,
    telefono: telefonoVeterinario.value,
    direccion: direccionVeterinario.value,
    rfc: rfcVeterinario.value,
    nss: nssVeterinario.value,
    especialidad: especialidadVeterinario.value
  }
  const created = await window.api.repositoryOperation('veterinario', 'create', user, pass, veterinario)
  if (created !== -1) { window.alert('Veterinario correctamente creado') } else { window.alert('Error al crear el veterinario') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  if (veterinarioCurp) {
    await renderVeterinarioData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateVeterinario)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createVeterinario)
  }
})
