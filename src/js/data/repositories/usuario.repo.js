import Connection from '../connection'

class UsuarioRepository {
  /**
   * @type {Connection} Instancia de la conexión a la base de datos del usuario.
   */
  #connection = null

  constructor (dbUsuario, dbPassword) {
    this.dbUsuario = dbUsuario
    this.dbPassword = dbPassword
  }

  /**
   * Valida el usuario con el que se intenta conectar a la base de datos.
   *
   * @returns {Promise<boolean>} Una promesa que devuelve true si el usuario es válido, false en caso contrario.
   */
  async validateUser () {
    try {
      this.#connection = await Connection.getInstance(this.dbUsuario, this.dbPassword)
      const connection = this.#connection.getConnection()
      return connection !== null
    } catch (error) {
      console.error('Error al validar el usuario', error)
      return false
    }
  }

  /**
   * Recupera la conexión a la base de datos.
   * @returns {Promise<Connection>} Una promesa que devuelve la conexión a la base de datos.
   */
  async getConnection () {
    if (this.#connection === null) {
      await this.validateUser()
    }
    return this.#connection.getConnection()
  }
}

export default UsuarioRepository
