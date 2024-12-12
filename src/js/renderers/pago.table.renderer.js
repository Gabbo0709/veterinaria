import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#pagos-table-body')

const renderTableBody = async (searchQuery) => {
  const user = await readCookie('userType')
  const pass = await readCookie('password')
  if (!searchQuery) {
    const pagosRepo = await window.api.repositoryOperation('pago', 'getAll', user, pass)
    pagosRepo.forEach(pago => createTableBodyRow(pago))
  } else {
    const pago = await window.api.repositoryOperation('pago', 'getPago', user, pass, searchQuery)
    createTableBodyRow(pago)
  }
}

const createTableBodyRow = (pago) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, pago.id),
    createHTMLElement('td', null, null, pago.fecha),
    createHTMLElement('td', null, null, pago.hora),
    createHTMLElement('td', null, null, pago.total),
    createHTMLElement('td', null, null, pago.tipoVenta),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(pago.id))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (pagoId) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/pagos.html?id=' + pagoId }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
