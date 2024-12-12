import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#empleados-table-body')

const renderTableBody = async (searchQuery) => {
  const user = await readCookie('userType')
  const pass = await readCookie('password')
  if (!searchQuery) {
    const empleadosRepo = await window.api.repositoryOperation('empleado', 'getAll', user, pass)
    empleadosRepo.forEach(empleado => createTableBodyRow(empleado))
  } else {
    const empleado = await window.api.repositoryOperation('empleado', 'getEmpleado', user, pass, searchQuery)
    createTableBodyRow(empleado)
  }
}

const createTableBodyRow = (empleado) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, empleado.curp),
    createHTMLElement('td', null, null, empleado.nombre),
    createHTMLElement('td', null, null, empleado.nss),
    createHTMLElement('td', null, null, empleado.telefono),
    createHTMLElement('td', null, null, empleado.fechaNacimiento),
    createHTMLElement('td', null, null, empleado.categoria),
    createHTMLElement('td', null, null, empleado.rfc),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(empleado.curp))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (empleadoCurp) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/empleados.html?curp=' + empleadoCurp }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
