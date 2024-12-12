import { getQueryParam, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)
const empleadoCurp = getQueryParam('curp')
let user = ''
let pass = ''

// HTML elements
const curpEmpleado = $('#curp-empleado')
const nombreEmpleado = $('#nombre-empleado')
const nssEmpleado = $('#nss-empleado')
const telefonoEmpleado = $('#telefono-empleado')
const fechaNacimientoEmpleado = $('#fecha-nacimiento-empleado')
const categoriaEmpleado = $('#categoria-empleado')
const rfcEmpleado = $('#rfc-empleado')
const updateButton = $('#update-button')
const createButton = $('#create-button')

// Fetch empleado data
const fetchEmpleadoData = async () => {
  const empleado = await window.api.repositoryOperation('empleado', 'getEmpleado', user, pass, empleadoCurp)
  return JSON.parse(JSON.stringify(empleado))
}

// Render empleado data
const renderEmpleadoData = async () => {
  const empleado = await fetchEmpleadoData()
  curpEmpleado.value = empleado.curp
  nombreEmpleado.value = empleado.nombre
  nssEmpleado.value = empleado.nss
  telefonoEmpleado.value = empleado.telefono
  fechaNacimientoEmpleado.value = empleado.fechaNacimiento
  categoriaEmpleado.value = empleado.categoria
  rfcEmpleado.value = empleado.rfc
}

// Update empleado
const updateEmpleado = async () => {
  const empleado = {
    curp: curpEmpleado.value,
    nombre: nombreEmpleado.value,
    nss: nssEmpleado.value,
    telefono: telefonoEmpleado.value,
    fechaNacimiento: fechaNacimientoEmpleado.value,
    categoria: categoriaEmpleado.value,
    rfc: rfcEmpleado.value
  }
  const updated = await window.api.repositoryOperation('empleado', 'update', user, pass, empleado)
  if (updated) { window.alert('Empleado correctamente actualizado') } else { window.alert('Error al actualizar el empleado') }
}

// Create empleado
const createEmpleado = async () => {
  const empleado = {
    curp: curpEmpleado.value,
    nombre: nombreEmpleado.value,
    nss: nssEmpleado.value,
    telefono: telefonoEmpleado.value,
    fechaNacimiento: fechaNacimientoEmpleado.value,
    categoria: categoriaEmpleado.value,
    rfc: rfcEmpleado.value
  }
  const created = await window.api.repositoryOperation('empleado', 'create', user, pass, empleado)
  if (created !== -1) { window.alert('Empleado correctamente creado') } else { window.alert('Error al crear el empleado') }
}

// Main function
document.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  // Disable both buttons by default
  updateButton.disabled = true
  createButton.disabled = true
  if (empleadoCurp) {
    await renderEmpleadoData()
    updateButton.disabled = false
    updateButton.addEventListener('click', updateEmpleado)
  } else {
    createButton.disabled = false
    createButton.addEventListener('click', createEmpleado)
  }
})
