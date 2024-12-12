import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#historial-medico-table-body')

const renderTableBody = async (searchQuery) => {
  const user = await readCookie('userType')
  const pass = await readCookie('password')
  if (!searchQuery) {
    const historialesRepo = await window.api.repositoryOperation('historialMedico', 'getAll', user, pass)
    historialesRepo.forEach(historial => createTableBodyRow(historial))
  } else {
    const historial = await window.api.repositoryOperation('historialMedico', 'getHistorialMedico', user, pass, searchQuery)
    createTableBodyRow(historial)
  }
}

const createTableBodyRow = (historial) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, historial.id),
    createHTMLElement('td', null, null, historial.fecha),
    createHTMLElement('td', null, null, historial.diagnostico),
    createHTMLElement('td', null, null, historial.medicina),
    createHTMLElement('td', null, null, historial.veterinarioCurp),
    createHTMLElement('td', null, null, historial.mascotaId),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(historial.id))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (historialId) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/historial-medico.html?id=' + historialId }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
