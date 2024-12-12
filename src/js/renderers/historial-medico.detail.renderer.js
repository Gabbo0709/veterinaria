import { getQueryParam, readCookie, formatDate } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const historialId = getQueryParam('id')
let user = ''
let pass = ''

// HTML elements
const fechaHistorial = $('#fecha-historial')
const diagnosticoHistorial = $('#diagnostico-historial')
const tratamientoHistorial = $('#tratamiento-historial')
const veterinariosSelect = $('#veterinarios-select')
const mascotaSelect = $('#mascota-select')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch historial data
const fetchHistorialData = async () => {
  const historial = await window.api.repositoryOperation('historialMedico', 'getHistorialMedico', user, pass, historialId)
  return JSON.parse(JSON.stringify(historial))
}

// Fetch mascotas data
const fetchMascotasData = async () => {
  const mascotas = await window.api.repositoryOperation('mascota', 'getAll', user, pass)
  return JSON.parse(JSON.stringify(mascotas))
}

// Fetch veterinarios data
const fetchVeterinariosData = async () => {
  const veterinarios = await window.api.repositoryOperation('veterinario', 'getAll', user, pass)
  return JSON.parse(JSON.stringify(veterinarios))
}

// Render mascotas data
const renderMascotasData = async () => {
  const mascotas = await fetchMascotasData()
  mascotas.forEach(mascota => {
    const option = document.createElement('option')
    option.value = mascota.id
    option.text = mascota.nombre
    mascotaSelect.appendChild(option)
  })
}

// Render veterinarios data
const renderVeterinariosData = async () => {
  const veterinarios = await fetchVeterinariosData()
  veterinarios.forEach(veterinario => {
    const option = document.createElement('option')
    option.value = veterinario.curp
    option.text = veterinario.nombre
    veterinariosSelect.appendChild(option)
  })
}

// Render historial data
const renderHistorialData = async () => {
  const historial = await fetchHistorialData()
  fechaHistorial.value = formatDate(historial.fecha)
  diagnosticoHistorial.value = historial.diagnostico
  tratamientoHistorial.value = historial.medicina
  veterinariosSelect.selectedIndex = Array.from(veterinariosSelect.options).findIndex(option => option.value === historial.veterinarioCurp)
  mascotaSelect.selectedIndex = Array.from(mascotaSelect.options).findIndex(option => option.value === historial.mascotaId)
}

// Update historial
const updateHistorial = async () => {
  const historial = {
    id: historialId,
    fecha: formatDate(fechaHistorial.value),
    diagnostico: diagnosticoHistorial.value,
    tratamiento: tratamientoHistorial.value,
    veterinarioCurp: veterinariosSelect.options[veterinariosSelect.selectedIndex].value,
    mascotaId: mascotaSelect.options[mascotaSelect.selectedIndex].value
  }
  const updated = await window.api.repositoryOperation('historialMedico', 'update', user, pass, historial)
  if (updated) { window.alert('Historial médico correctamente actualizado') } else { window.alert('Error al actualizar el historial médico') }
}

// Create historial
const createHistorial = async () => {
  const historial = {
    fecha: fechaHistorial.value,
    diagnostico: diagnosticoHistorial.value,
    tratamiento: tratamientoHistorial.value,
    veterinarioCurp: veterinariosSelect.options[veterinariosSelect.selectedIndex].value,
    mascotaId: mascotaSelect.options[mascotaSelect.selectedIndex].value
  }
  const created = await window.api.repositoryOperation('historialMedico', 'create', user, pass, historial)
  if (created !== -1) { window.alert('Historial médico correctamente creado') } else { window.alert('Error al crear el historial médico') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  await renderMascotasData()
  await renderVeterinariosData()
  if (historialId) {
    await renderHistorialData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateHistorial)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createHistorial)
  }
})
