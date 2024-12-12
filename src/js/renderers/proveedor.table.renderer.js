import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#proveedores-table-body')

const renderTableBody = async (searchQuery) => {
  const user = await readCookie('userType')
  const pass = await readCookie('password')
  if (!searchQuery) {
    const proveedoresRepo = await window.api.repositoryOperation('proveedor', 'getAll', user, pass)
    proveedoresRepo.forEach(proveedor => createTableBodyRow(proveedor))
  } else {
    const proveedor = await window.api.repositoryOperation('proveedor', 'getProveedor', user, pass, searchQuery)
    createTableBodyRow(proveedor)
  }
}

const createTableBodyRow = (proveedor) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, proveedor.id),
    createHTMLElement('td', null, null, proveedor.nombre),
    createHTMLElement('td', null, null, proveedor.contacto),
    createHTMLElement('td', null, null, proveedor.direccion),
    createHTMLElement('td', null, null, proveedor.telefono),
    createHTMLElement('td', null, null, proveedor.tipoProducto),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(proveedor.id))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (proveedorId) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/proveedores.html?id=' + proveedorId }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
