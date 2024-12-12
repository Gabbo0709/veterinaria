import { getQueryParam, readCookie, formatDate } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const citaNumber = getQueryParam('numero')
let user = ''
let pass = ''

// HTML elements
const fechaCita = $('#fecha-cita')
const horaCita = $('#hora-cita')
const estadoCitaSelect = $('#estado-cita-select')
const motivoCita = $('#motivo-cita')
const veterinariosSelect = $('#veterinarios-select')
const clienteSelect = $('#cliente-select')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch cita data
const fetchCitaData = async () => {
  const cita = await window.api.repositoryOperation('cita', 'getCita', user, pass, citaNumber)
  return JSON.parse(JSON.stringify(cita))
}

// Fetch clientes data
const fetchClientesData = async () => {
  const clientes = await window.api.repositoryOperation('cliente', 'getAll', user, pass)
  console.log('Clientes:', clientes)
  return JSON.parse(JSON.stringify(clientes))
}

// Fetch veterinarios data
const fetchVeterinariosData = async () => {
  const veterinarios = await window.api.repositoryOperation('veterinario', 'getAll', user, pass)
  console.log('Veterinarios:', veterinarios)
  return JSON.parse(JSON.stringify(veterinarios))
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

// Render cita data
const renderCitaData = async () => {
  const cita = await fetchCitaData()
  fechaCita.value = formatDate(cita.fecha)
  horaCita.value = cita.hora
  estadoCitaSelect.selectedIndex = cita.estado === 'Pendiente' ? 0 : 1
  motivoCita.value = cita.motivo
  veterinariosSelect.selectedIndex = Array.from(veterinariosSelect.options).findIndex(option => option.value === cita.veterinarioCurp)
  clienteSelect.selectedIndex = Array.from(clienteSelect.options).findIndex(option => option.value === cita.clienteId)
}

// Update cita
const updateCita = async () => {
  const cita = {
    numero: citaNumber,
    fecha: formatDate(fechaCita.value),
    hora: horaCita.value,
    estado: estadoCitaSelect.options[estadoCitaSelect.selectedIndex].text,
    motivo: motivoCita.value,
    veterinarioCurp: veterinariosSelect.options[veterinariosSelect.selectedIndex].value
  }
  const updated = await window.api.repositoryOperation('cita', 'update', user, pass, cita)
  if (updated) { window.alert('Cita correctamente actualizada') } else { window.alert('Error al actualizar la cita') }
}

// Create cita
const createCita = async () => {
  const cita = {
    fecha: fechaCita.value,
    hora: horaCita.value,
    estado: estadoCitaSelect.options[estadoCitaSelect.selectedIndex].text,
    motivo: motivoCita.value,
    veterinarioCurp: veterinariosSelect.options[veterinariosSelect.selectedIndex].value,
    clienteId: clienteSelect.options[clienteSelect.selectedIndex].value
  }
  const created = await window.api.repositoryOperation('cita', 'create', user, pass, cita)
  if (created !== 0) { window.alert('Cita correctamente creada') } else { window.alert('Error al crear la cita') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  // Make clientSelect readonly by default
  clienteSelect.disabled = true
  await renderClientesData()
  await renderVeterinariosData()
  if (citaNumber) {
    await renderCitaData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateCita)
  } else {
    createButton.disabled = false
    clienteSelect.disabled = false
    createButton.addEventListener('click', createCita)
  }
})
