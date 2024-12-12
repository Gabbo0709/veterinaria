import { getQueryParam, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const mascotaId = getQueryParam('id')
let user = ''
let pass = ''

// HTML elements
const nombreMascota = $('#nombre-mascota')
const edadMascota = $('#edad-mascota')
const sexoMascota = $('#sexo-mascota')
const pesoMascota = $('#peso-mascota')
const estaturaMascota = $('#estatura-mascota')
const especieMascota = $('#especie-mascota')
const historialMedicoSelect = $('#historial-medico-select')
const clienteSelect = $('#cliente-select')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch mascota data
const fetchMascotaData = async () => {
  const mascota = await window.api.repositoryOperation('mascota', 'getMascota', user, pass, mascotaId)
  return JSON.parse(JSON.stringify(mascota))
}

// Fetch historiales médicos data
const fetchHistorialesMedicosData = async () => {
  const historialesMedicos = await window.api.repositoryOperation('historialMedico', 'getAll', user, pass)
  return JSON.parse(JSON.stringify(historialesMedicos))
}

// Fetch clientes data
const fetchClientesData = async () => {
  const clientes = await window.api.repositoryOperation('cliente', 'getAll', user, pass)
  return JSON.parse(JSON.stringify(clientes))
}

// Render historiales médicos data
const renderHistorialesMedicosData = async () => {
  const historialesMedicos = await fetchHistorialesMedicosData()
  historialesMedicos.forEach(historial => {
    const option = document.createElement('option')
    option.value = historial.id
    option.text = historial.diagnostico
    historialMedicoSelect.appendChild(option)
  })
}

// Render clientes data
const renderClientesData = async () => {
  const clientes = await fetchClientesData()
  clientes.forEach(cliente => {
    const option = document.createElement('option')
    option.value = cliente.id
    option.text = cliente.nombre
    clienteSelect.appendChild(option)
  })
}

// Render mascota data
const renderMascotaData = async () => {
  const mascota = await fetchMascotaData()
  nombreMascota.value = mascota.nombre
  edadMascota.value = mascota.edad
  sexoMascota.value = mascota.sexo
  pesoMascota.value = mascota.peso
  estaturaMascota.value = mascota.estatura
  especieMascota.value = mascota.especie
  historialMedicoSelect.selectedIndex = Array.from(historialMedicoSelect.options).findIndex(option => option.value === mascota.historialMedicoId)
  clienteSelect.selectedIndex = Array.from(clienteSelect.options).findIndex(option => option.value === mascota.clienteId)
}

// Update mascota
const updateMascota = async () => {
  const mascota = {
    id: mascotaId,
    nombre: nombreMascota.value,
    edad: edadMascota.value,
    sexo: sexoMascota.value,
    peso: pesoMascota.value,
    estatura: estaturaMascota.value,
    especie: especieMascota.value,
    historialMedicoId: historialMedicoSelect.options[historialMedicoSelect.selectedIndex].value,
    clienteId: clienteSelect.options[clienteSelect.selectedIndex].value
  }
  const updated = await window.api.repositoryOperation('mascota', 'update', user, pass, mascota)
  if (updated) { window.alert('Mascota correctamente actualizada') } else { window.alert('Error al actualizar la mascota') }
}

// Create mascota
const createMascota = async () => {
  const mascota = {
    nombre: nombreMascota.value,
    edad: edadMascota.value,
    sexo: sexoMascota.value,
    peso: pesoMascota.value,
    estatura: estaturaMascota.value,
    especie: especieMascota.value,
    historialMedicoId: historialMedicoSelect.options[historialMedicoSelect.selectedIndex].value,
    clienteId: clienteSelect.options[clienteSelect.selectedIndex].value
  }
  const created = await window.api.repositoryOperation('mascota', 'create', user, pass, mascota)
  if (created !== -1) { window.alert('Mascota correctamente creada') } else { window.alert('Error al crear la mascota') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  await renderHistorialesMedicosData()
  await renderClientesData()
  if (mascotaId) {
    await renderMascotaData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateMascota)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createMascota)
  }
})
