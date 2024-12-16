/**
 * Crea una cookie en el navegador
 * @param {string} key Nombre de la cookie
 * @param {string} val Valor de la cookie
 */
const createCookie = async (key, val) => {
  if (readCookie(key).length > 0) return
  await window.api.cookieOperation('create', key, val)
}

/**
 * Lee una cookie del navegador
 * @param {string} key Nombre de la cookie
 * @returns {string} Valor de la cookie
 */
const readCookie = async key => {
  const cookie = await window.api.cookieOperation('read', key, null)
  console.log('Cookie leída:', cookie)
  return cookie[0].value
}

/**
 * Elimina una cookie del navegador
 * @param {string} key Nombre de la cookie
 * @retunr {boolean} Confirmación de que se borró la cookie
 */
const deleteCookie = async key => {
  await window.api.cookieOperation('delete', key, null)
  try {
    const cookie = readCookie(key)
    return !(cookie !== null || cookie !== undefined)
  } catch {
    return true
  }
}

/**
 * Cierra la sesión
 */
const logout = async (reponse) => {
  const deletedCookies = await Promise.all([deleteCookie('userType'), deleteCookie('password')])
  if (deletedCookies.every(cookie => cookie)) {
    window.location.href = reponse
  }
}

/**
 * Crea un elemento HTML con las propiedades especificadas
 * @param {string} tag Nombre de la etiqueta HTML
 * @param {Array<string>} classes Clases CSS del elemento
 * @param {Object} attributes Atributos del elemento
 * @param {string} innerHTML Contenido del elemento
 * @returns {HTMLElement} Elemento HTML creado
 */
const createHTMLElement = (tag, classes, attributes, innerHTML) => {
  const element = document.createElement(tag)
  if (classes) element.classList.add(...classes)
  if (attributes) Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]))
  if (innerHTML) element.innerHTML = innerHTML
  return element
}

/**
 * Obtiene un parámetro de la URL
 * @param {string} key Nombre del parámetro
 * @returns {string} Valor del parámetro
 */
const getQueryParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(key)
}

/**
 * Formatea una fecha en formato dd-mm-aaaa a aaaa-mm-dd
 * @param {string} date Fecha a formatear
 * @returns {string} Fecha formateada
 */
const formatDate = (date) => {
  const [day, month, year] = date.split('-')
  return `${year}-${month}-${day}`
}

export default { createCookie, readCookie, createHTMLElement }
export { createCookie }
export { readCookie }
export { createHTMLElement }
export { getQueryParam }
export { formatDate }
export { logout }
