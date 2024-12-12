import { createHTMLElement, readCookie } from '../utils/utils.js'

const $ = selector => document.querySelector(selector)

const tableBody = $('#mascotas-table-body')

const renderTableBody = async (searchQuery) => {
  const user = await readCookie('userType')
  const pass = await readCookie('password')
  if (!searchQuery) {
    const mascotasRepo = await window.api.repositoryOperation('mascota', 'getAll', user, pass)
    mascotasRepo.forEach(mascota => createTableBodyRow(mascota))
  } else {
    const mascota = await window.api.repositoryOperation('mascota', 'getMascota', user, pass, searchQuery)
    createTableBodyRow(mascota)
  }
}

const createTableBodyRow = (mascota) => {
  const row = createHTMLElement('tr')
  const columns = [
    createHTMLElement('td', null, null, mascota.id),
    createHTMLElement('td', null, null, mascota.nombre),
    createHTMLElement('td', null, null, mascota.edad),
    createHTMLElement('td', null, null, mascota.sexo),
    createHTMLElement('td', null, null, mascota.peso),
    createHTMLElement('td', null, null, mascota.estatura),
    createHTMLElement('td', null, null, mascota.especie),
    createHTMLElement('td', null, null, mascota.historialMedicoId),
    createHTMLElement('td', null, null, mascota.clienteId),
    createHTMLElement('td', null, null, null).appendChild(createDetailsButton(mascota.id))
  ]
  columns.forEach(column => row.appendChild(column))
  tableBody.appendChild(row)
}

const createDetailsButton = (mascotaId) => {
  const button = createHTMLElement('a', ['button', 'is-info', 'is-narrow'], { href: '../details/mascotas.html?id=' + mascotaId }, 'Detalles')
  return button
}

window.addEventListener('DOMContentLoaded', async () => {
  await renderTableBody()
  $('#search').addEventListener('input', async () => {
    tableBody.innerHTML = ''
    await renderTableBody($('#search').value)
  })
})
