import { readCookie, createHTMLElement, logout } from '../utils/utils.js'
const $ = selector => document.querySelector(selector)

const menuSection = $('#menu')

const renderMenuUserType = async () => {
  const userType = await readCookie('userType')
  switch (userType) {
    case 'uadmin': renderMenuAdmin(); break
    case 'veterina': renderMenuVeterinario(); break
    case 'empleado': renderMenuEmpleado(); break
  }
}

const renderMenuAdmin = () => {
  const buttons = {
    Clientes: 'tables/clientes.html',
    Mascotas: 'tables/mascotas.html',
    'Historial Médico': 'tables/historial-medico.html',
    Proveedores: 'tables/proveedores.html',
    Pagos: 'tables/pagos.html',
    Empleados: 'tables/empleados.html',
    Veterinarios: 'tables/veterinarios.html',
    Productos: 'tables/productos.html',
    Citas: 'tables/citas.html'
  }

  Object.keys(buttons).forEach(key => {
    createMenuButton(key, buttons[key])
  })
}

const renderMenuVeterinario = () => {
  const buttons = {
    Clientes: 'tables/clientes.html',
    Mascotas: 'tables/mascotas.html',
    'Historial Médico': 'table/historial-medico.html',
    Empleados: 'tables/empleados.html',
    Veterinarios: 'tables/veterinarios.html',
    Productos: 'tables/productos.html',
    Citas: 'tables/citas.html'
  }

  Object.keys(buttons).forEach(key => {
    createMenuButton(key, buttons[key])
  })
}

const renderMenuEmpleado = () => {
  const buttons = {
    Clientes: 'table/clientes.html',
    Mascotas: 'table/mascotas.html',
    Proveedores: 'table/proveedores.html',
    Pagos: 'table/pagos.html',
    Empleados: 'table/empleados.html',
    Veterinarios: 'table/veterinarios.html',
    Productos: 'table/productos.html',
    Citas: 'table/citas.html'
  }
  Object.keys(buttons).forEach(key => {
    createMenuButton(key, buttons[key])
  })
}

const createMenuButton = (text, link) => {
  const divButton = createHTMLElement('div', ['column', 'is-narrow', 'cell'], null, null)
  const button = createHTMLElement('a', ['button', 'box', 'is-primary', 'is-large', 'button-link'], { href: link }, text)
  divButton.appendChild(button)
  menuSection.appendChild(divButton)
}

const logoutNow = async () => {
  await logout('../login.html')
}

window.addEventListener('DOMContentLoaded', async () => {
  $('#logout-button').addEventListener('click', logoutNow)
  await renderMenuUserType()
})
