import { getQueryParam, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const productoId = getQueryParam('id')
let user = ''
let pass = ''

// HTML elements
const tipoProducto = $('#tipo-producto')
const nombreProducto = $('#nombre-producto')
const precioProducto = $('#precio-producto')
const fechaIngresoProducto = $('#fecha-ingreso-producto')
const fechaCaducidadProducto = $('#fecha-caducidad-producto')
const proveedorSelect = $('#proveedor-select')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch producto data
const fetchProductoData = async () => {
  const producto = await window.api.repositoryOperation('producto', 'getProducto', user, pass, productoId)
  return JSON.parse(JSON.stringify(producto))
}

// Fetch proveedores data
const fetchProveedoresData = async () => {
  const proveedores = await window.api.repositoryOperation('proveedor', 'getAll', user, pass)
  return JSON.parse(JSON.stringify(proveedores))
}

// Render proveedores data
const renderProveedoresData = async () => {
  const proveedores = await fetchProveedoresData()
  proveedores.forEach(proveedor => {
    const option = document.createElement('option')
    option.value = proveedor.id
    option.text = proveedor.nombre
    proveedorSelect.appendChild(option)
  })
}

// Render producto data
const renderProductoData = async () => {
  const producto = await fetchProductoData()
  tipoProducto.value = producto.tipo
  nombreProducto.value = producto.nombre
  precioProducto.value = producto.precio
  fechaIngresoProducto.value = producto.fechaIngreso
  fechaCaducidadProducto.value = producto.fechaCaducidad
  proveedorSelect.selectedIndex = Array.from(proveedorSelect.options).findIndex(option => option.value === producto.proveedorId)
}

// Update producto
const updateProducto = async () => {
  const producto = {
    id: productoId,
    tipo: tipoProducto.value,
    nombre: nombreProducto.value,
    precio: precioProducto.value,
    fechaIngreso: fechaIngresoProducto.value,
    fechaCaducidad: fechaCaducidadProducto.value,
    proveedorId: proveedorSelect.options[proveedorSelect.selectedIndex].value
  }
  const updated = await window.api.repositoryOperation('producto', 'update', user, pass, producto)
  if (updated) { window.alert('Producto correctamente actualizado') } else { window.alert('Error al actualizar el producto') }
}

// Create producto
const createProducto = async () => {
  const producto = {
    tipo: tipoProducto.value,
    nombre: nombreProducto.value,
    precio: precioProducto.value,
    fechaIngreso: fechaIngresoProducto.value,
    fechaCaducidad: fechaCaducidadProducto.value,
    proveedorId: proveedorSelect.options[proveedorSelect.selectedIndex].value
  }
  const created = await window.api.repositoryOperation('producto', 'create', user, pass, producto)
  if (created !== -1) { window.alert('Producto correctamente creado') } else { window.alert('Error al crear el producto') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  await renderProveedoresData()
  if (productoId) {
    await renderProductoData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateProducto)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createProducto)
  }
})
