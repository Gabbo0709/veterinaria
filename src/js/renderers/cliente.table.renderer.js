import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#clientes-table-body')

let user = ''
let pass = ''

const renderTableBody = async (searchQuery) => {
  if (!searchQuery) {
    const clientesRepo = await window.api.repositoryOperation('cliente', 'getAll', user, pass)
    clientesRepo.forEach(cliente => createTableBodyRow(cliente))
  } else {
    const cliente = await window.api.repositoryOperation('cliente', 'getCliente', user, pass, searchQuery)
    createTableBodyRow(cliente)
  }
}

const createTableBodyRow = (cliente) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, cliente.id),
    createHTMLElement('td', null, null, cliente.nombre),
    createHTMLElement('td', null, null, cliente.tel),
    createHTMLElement('td', null, null, cliente.direccion),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(cliente.id))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (clienteId) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/clientes.html?id=' + clienteId }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  user = await readCookie('userType')
  pass = await readCookie('password')
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
