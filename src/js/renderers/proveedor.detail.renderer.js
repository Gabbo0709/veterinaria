import { getQueryParam, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const proveedorId = getQueryParam('id')
let user = ''
let pass = ''

// HTML elements
const nombreProveedor = $('#nombre-proveedor')
const contactoProveedor = $('#contacto-proveedor')
const direccionProveedor = $('#direccion-proveedor')
const telefonoProveedor = $('#telefono-proveedor')
const tipoProducto = $('#tipo-producto')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch proveedor data
const fetchProveedorData = async () => {
  const proveedor = await window.api.repositoryOperation('proveedor', 'getProveedor', user, pass, proveedorId)
  return JSON.parse(JSON.stringify(proveedor))
}

// Render proveedor data
const renderProveedorData = async () => {
  const proveedor = await fetchProveedorData()
  nombreProveedor.value = proveedor.nombre
  contactoProveedor.value = proveedor.contacto
  direccionProveedor.value = proveedor.direccion
  telefonoProveedor.value = proveedor.telefono
  tipoProducto.value = proveedor.tipoProducto
}

// Update proveedor
const updateProveedor = async () => {
  const proveedor = {
    id: proveedorId,
    nombre: nombreProveedor.value,
    contacto: contactoProveedor.value,
    direccion: direccionProveedor.value,
    telefono: telefonoProveedor.value,
    tipoProducto: tipoProducto.value
  }
  const updated = await window.api.repositoryOperation('proveedor', 'update', user, pass, proveedor)
  if (updated) { window.alert('Proveedor correctamente actualizado') } else { window.alert('Error al actualizar el proveedor') }
}

// Create proveedor
const createProveedor = async () => {
  const proveedor = {
    nombre: nombreProveedor.value,
    contacto: contactoProveedor.value,
    direccion: direccionProveedor.value,
    telefono: telefonoProveedor.value,
    tipoProducto: tipoProducto.value
  }
  const created = await window.api.repositoryOperation('proveedor', 'create', user, pass, proveedor)
  if (created !== -1) { window.alert('Proveedor correctamente creado') } else { window.alert('Error al crear el proveedor') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  if (proveedorId) {
    await renderProveedorData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateProveedor)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createProveedor)
  }
})
