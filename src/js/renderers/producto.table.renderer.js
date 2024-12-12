import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#productos-table-body')

const renderTableBody = async (searchQuery) => {
  const user = await readCookie('userType')
  const pass = await readCookie('password')
  if (!searchQuery) {
    const productosRepo = await window.api.repositoryOperation('producto', 'getAll', user, pass)
    productosRepo.forEach(producto => createTableBodyRow(producto))
  } else {
    const producto = await window.api.repositoryOperation('producto', 'getProducto', user, pass, searchQuery)
    createTableBodyRow(producto)
  }
}

const createTableBodyRow = (producto) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, producto.id),
    createHTMLElement('td', null, null, producto.tipo),
    createHTMLElement('td', null, null, producto.nombre),
    createHTMLElement('td', null, null, producto.precio),
    createHTMLElement('td', null, null, producto.fechaIngreso),
    createHTMLElement('td', null, null, producto.fechaCaducidad),
    createHTMLElement('td', null, null, producto.proveedorId),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(producto.id))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (productoId) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/productos.html?id=' + productoId }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
