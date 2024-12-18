import Cliente from '../../models/cliente.model.js'
import Connection from '../connection.js'

class ClientesRepository {
  /**
    * @type {string}
    * Nombre de la tabla en la base de datos.
    * @private
    * @readonly
   */
  static #TABLE = 'clientes'

  /**
    * Mapea una fila obtenida en la base de datos a un objeto Cliente.
    * @param {Object} row Fila obtenida de la base de datos.
    * @returns {Cliente} Un objeto de tipo Cliente.
   */
  static mapRowToCliente (row) {
    return new Cliente(
      row.Cli_ID,
      row.Cli_Nom,
      row.Cli_Tel,
      row.Cli_Direc
    )
  }

  constructor (dbUser, dbPassword) {
    this.user = dbUser
    this.password = dbPassword
  }

  /**
   * Recupera todos los clientes de la base de datos utilizando la conexión del usuario.
   * @returns {Promise<Cliente[]>} Una promesa que devuelve un arreglo de clientes.
   */
  async getAll () {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${ClientesRepository.#TABLE}`
      const [rows] = await connection.getConnection().query(query)
      console.log('Rows:', rows)
      return rows.map(row => ClientesRepository.mapRowToCliente(row))
    } catch (error) {
      console.error('Error al recuperar los clientes', error)
    }
  }

  /**
   * Recupera un cliente de la base de datos por su ID.
   * @param {number} cliId ID del cliente.
   * @returns {Promise<Cliente> | null} Una promesa que devuelve un objeto de tipo Cliente o null si no se encontró el cliente.
   */
  async getCliente (cliId) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${ClientesRepository.#TABLE} WHERE Cli_ID = ?`
      const [rows] = await connection.getConnection().execute(query, [cliId])
      return ClientesRepository.mapRowToCliente(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar el cliente', error)
      return null
    }
  }

  /**
   * Crea un nuevo cliente en la base de datos.
   * @param {Cliente} cliente Un objeto de tipo Cliente.
   * @param {mysql.Connection} Conexión a la base de datos.
   * @returns {Promise<number>} Una promesa que devuelve el ID del cliente creado.
   */
  async create (cliente) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `INSERT INTO ${ClientesRepository.#TABLE} (Cli_Nom, Cli_Tel, Cli_Direc) VALUES (?, ?, ?)`
      const [result] = await connection.getConnection().execute(query, [cliente.nombre, cliente.tel, cliente.direccion])
      return result.insertId
    } catch (error) {
      console.error('Error al crear el cliente', error)
      return -1
    }
  }

  /**
   * Actualiza un cliente en la base de datos a partir de su ID.
   * @param {Cliente} cliente Un objeto de tipo Cliente.
   * @param {mysql.Connection} Conexión a la base de datos.
   * @returns {Promise<boolean>} Una promesa que devuelve true si la actualización fue exitosa.
   */
  async update (cliente) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `UPDATE ${ClientesRepository.#TABLE} SET Cli_Nom = ?, Cli_Tel = ?, Cli_Direc = ? WHERE Cli_ID = ?`
      const values = [cliente.nombre, cliente.tel, cliente.direccion, cliente.id]
      await connection.getConnection().execute(query, values)
      return true
    } catch (error) {
      console.error('Error al actualizar el cliente', error)
      return false
    }
  }

  /**
   * Elimina un cliente de la base de datos a partir de su ID.
   * @param {number} cliId ID del cliente.
   * @param {mysql.Connection} Conexión a la base de datos.
   * @returns {Promise<boolean>} Una promesa que devuelve true si la eliminación fue exitosa.
   */
  async delete (cliId) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `DELETE FROM ${ClientesRepository.#TABLE} WHERE Cli_ID = ?`
      const [result] = await connection.getConnection().execute(query, [cliId])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al eliminar el cliente', error)
      return false
    }
  }
}

export default ClientesRepository
