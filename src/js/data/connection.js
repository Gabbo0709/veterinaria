import config from '../config/config.js'
import mysql from 'mysql2/promise'

class Connection {
  /**
   * @type {Connection} Instancia única de la conexión.
  */
  static instance

  /**
   * @type {mysql.Connection} Conexión a la base de datos.
   */
  #connection

  constructor () {
    this.#connection = null
  }

  /**
   *
   * @param {string} _user Usuario de la base de datos
   * @param {string} _password Contraseña del usuario de la base de datos
   *
   * Conecta a la base de datos con el usuario y contraseña proporcionados.
   *
   * @returns {Promise<void>} Una promesa que no devuelve nada.
   *
   */
  async #connect (_user, _password) {
    try {
      if (!this.#connection) {
        this.#connection = await mysql.createConnection({
          host: config.DB_CONNECTION.host,
          user: _user,
          password: _password,
          database: config.DB_CONNECTION.name
        })
      }
    } catch (error) {
      console.error('Error al conectar con la base de datos', error)
      this.#connection = null
    }
  }

  /**
   * Cierra la conexión a la base de datos.
   * @returns {Promise<void>} Una promesa que no devuelve nada.
   */
  async disconnect () {
    if (this.#connection !== null) {
      await this.#connection.end()
      this.#connection = null
    }
    Connection.instance = null
  }

  /**
   *
   * Recupera la instancia única de la conexión.
   * Si la instancia no existe la crea y la conecta.
   *
   * @returns {Promise<Connection>} Una promesa que devuelve la instancia de la conexión. De tipo Connection.
   */
  static async getInstance (_user, _password) {
    if (Connection.instance == null) {
      Connection.instance = new Connection()
      await Connection.instance.#connect(_user, _password)
    }
    return Connection.instance
  }

  /**
   * Recupera la conexión a la base de datos.
   * @returns {mysql.Connection} La conexión a la base de datos. De tipo mysql.Connection.
   */
  getConnection () { return this.#connection }
}

export default Connection
