import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#citas-table-body')

let user = ''
let pass = ''

const renderTableBody = async (searchQuery) => {
  if (!searchQuery) {
    const citasRepo = await window.api.repositoryOperation('cita', 'getAll', user, pass)
    citasRepo.forEach(cita => createTableBodyRow(cita))
  } else {
    const citasRepo = await window.api.repositoryOperation('cita', 'getCita', user, pass, searchQuery)
    createTableBodyRow(citasRepo)
  }
}

const createTableBodyRow = (cita) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, cita.numero),
    createHTMLElement('td', null, null, cita.fecha),
    createHTMLElement('td', null, null, cita.hora),
    createHTMLElement('td', null, null, cita.estado),
    createHTMLElement('td', null, null, cita.motivo),
    createHTMLElement('td', null, null, cita.clienteId),
    createHTMLElement('td', null, null, cita.veterinarioCurp),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(cita.numero))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (numeroCita) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/citas.html?numero=' + numeroCita }, 'Detalles')
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
