import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#veterinarios-table-body')

const renderTableBody = async (searchQuery) => {
  const user = await readCookie('userType')
  const pass = await readCookie('password')
  if (!searchQuery) {
    const veterinariosRepo = await window.api.repositoryOperation('veterinario', 'getAll', user, pass)
    veterinariosRepo.forEach(veterinario => createTableBodyRow(veterinario))
  } else {
    const veterinario = await window.api.repositoryOperation('veterinario', 'getVeterinario', user, pass, searchQuery)
    createTableBodyRow(veterinario)
  }
}

const createTableBodyRow = (veterinario) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, veterinario.curp),
    createHTMLElement('td', null, null, veterinario.nombre),
    createHTMLElement('td', null, null, veterinario.telefono),
    createHTMLElement('td', null, null, veterinario.direccion),
    createHTMLElement('td', null, null, veterinario.rfc),
    createHTMLElement('td', null, null, veterinario.nss),
    createHTMLElement('td', null, null, veterinario.especialidad),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(veterinario.curp))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (veterinarioCurp) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/veterinarios.html?curp=' + veterinarioCurp }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
