import { getQueryParam, readCookie, formatDate } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const pagoId = getQueryParam('id')
let user = ''
let pass = ''

// HTML elements
const fechaPago = $('#fecha-pago')
const horaPago = $('#hora-pago')
const totalPago = $('#total-pago')
const tipoVenta = $('#tipo-venta')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch pago data
const fetchPagoData = async () => {
  const pago = await window.api.repositoryOperation('pago', 'getPago', user, pass, pagoId)
  return JSON.parse(JSON.stringify(pago))
}

// Render pago data
const renderPagoData = async () => {
  const pago = await fetchPagoData()
  fechaPago.value = formatDate(pago.fecha)
  horaPago.value = pago.hora
  totalPago.value = pago.total
  tipoVenta.value = pago.tipoVenta
}

// Update pago
const updatePago = async () => {
  const pago = {
    id: pagoId,
    fecha: formatDate(fechaPago.value),
    hora: horaPago.value,
    total: totalPago.value,
    tipoVenta: tipoVenta.value
  }
  const updated = await window.api.repositoryOperation('pago', 'update', user, pass, pago)
  if (updated) { window.alert('Pago correctamente actualizado') } else { window.alert('Error al actualizar el pago') }
}

// Create pago
const createPago = async () => {
  const pago = {
    fecha: fechaPago.value,
    hora: horaPago.value,
    total: totalPago.value,
    tipoVenta: tipoVenta.value
  }
  const created = await window.api.repositoryOperation('pago', 'create', user, pass, pago)
  if (created !== -1) { window.alert('Pago correctamente creado') } else { window.alert('Error al crear el pago') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  if (pagoId) {
    await renderPagoData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updatePago)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createPago)
  }
})
