import { getQueryParam, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const clienteId = getQueryParam('id')
let user = ''
let pass = ''

// HTML elements
const nombreCliente = $('#nombre-cliente')
const telCliente = $('#tel-cliente')
const direccionCliente = $('#direccion-cliente')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch cliente data
const fetchClienteData = async () => {
  const cliente = await window.api.repositoryOperation('cliente', 'getCliente', user, pass, clienteId)
  return JSON.parse(JSON.stringify(cliente))
}

// Render cliente data
const renderClienteData = async () => {
  const cliente = await fetchClienteData()
  nombreCliente.value = cliente.nombre
  telCliente.value = cliente.tel
  direccionCliente.value = cliente.direccion
}

// Update cliente
const updateCliente = async () => {
  const cliente = {
    id: clienteId,
    nombre: nombreCliente.value,
    tel: telCliente.value,
    direccion: direccionCliente.value
  }
  const updated = await window.api.repositoryOperation('cliente', 'update', user, pass, cliente)
  if (updated) { window.alert('Cliente correctamente actualizado') } else { window.alert('Error al actualizar el cliente') }
}

// Create cliente
const createCliente = async () => {
  const cliente = {
    nombre: nombreCliente.value,
    tel: telCliente.value,
    direccion: direccionCliente.value
  }
  const created = await window.api.repositoryOperation('cliente', 'create', user, pass, cliente)
  if (created !== -1) { window.alert('Cliente correctamente creado') } else { window.alert('Error al crear el cliente') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  if (clienteId) {
    await renderClienteData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateCliente)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createCliente)
  }
})
