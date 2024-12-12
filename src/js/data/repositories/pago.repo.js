import Pago from '../../models/pago.model.js'
import Connection from '../connection.js'

class PagoRepository {
  /**
     * @type {string}
     * Nombre de la tabla en la base de datos.
     * @private
     * @readonly
     */
  static #TABLE = 'Pagos'

  /**
     * Mapea una fila obtenida en la base de datos a un objeto Pago.
     * @param {Object} row Fila obtenida de la base de datos.
     * @returns {Pago} Un objeto de tipo Pago.
     */
  static mapRowToPago (row) {
    return new Pago(
      row.Vent_ID,
      row.Vent_Fech,
      row.Vent_Hora,
      row.Vent_Total,
      row.Vent_TVent
    )
  }

  constructor (dbUser, dbPassword) {
    this.user = dbUser
    this.password = dbPassword
  }

  /**
     * Recupera todos los pagos de la base de datos utilizando la conexión del usuario.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<Pago[]>} Una promesa que devuelve un arreglo de pagos.
     */
  async getAll () {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${PagoRepository.#TABLE}`
      const [rows] = await connection.getConnection().query(query)
      return rows.map(row => PagoRepository.mapRowToPago(row))
    } catch (error) {
      console.error('Error al recuperar los pagos', error)
    }
  }

  /**
     * Recupera un pago de la base de datos por su ID.
     * @param {number} id ID del pago.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<Pago> | null} Una promesa que devuelve un objeto de tipo Pago o null si no se encontró el pago.
    */
  async getPago (id) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${PagoRepository.#TABLE} WHERE Vent_ID = ?`
      const [rows] = await connection.getConnection().execute(query, [id])
      return PagoRepository.mapRowToPago(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar el pago', error)
      return null
    }
  }

  /**
     * Inserta un nuevo pago en la base de datos.
     * @param {Pago} pago Objeto de tipo Pago.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<number>} Una promesa que devuelve el ID del pago insertado.
     */
  async create (pago) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `INSERT INTO ${PagoRepository.#TABLE} (Vent_Fech, Vent_Hora, Vent_Total, Vent_TVent) VALUES (?, ?, ?, ?)`
      const values = [pago.fecha, pago.hora, pago.total, pago.tipoVenta]
      const [result] = await connection.getConnection().execute(query, values)
      return result.insertId
    } catch (error) {
      console.error('Error al insertar el pago', error)
      return -1
    }
  }

  /**
     * Actualiza un pago en la base de datos a partir de su ID.
     *
     * @param {Pago} pago Objeto de tipo Pago.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     *
     * @returns {Promise<boolean>} Una promesa que devuelve true si el pago se actualizó correctamente, false en caso contrario.
     */
  async update (pago) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `UPDATE ${PagoRepository.#TABLE} SET Vent_Fech = ?, Vent_Hora = ?, Vent_Total = ?, Vent_TVent = ? WHERE Vent_ID = ?`
      const values = [pago.fecha, pago.hora, pago.total, pago.tipoVenta, pago.id]
      const [result] = await connection.getConnection().execute(query, values)
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al actualizar el pago', error)
      return false
    }
  }

  /**
     * Elimina un pago de la base de datos a partir de su ID.
     *
     * @param {number} id ID del pago.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     *
     * @returns {Promise<boolean>} Una promesa que devuelve true si el pago se eliminó correctamente, false en caso contrario.
     */
  async delete (id) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `DELETE FROM ${PagoRepository.#TABLE} WHERE Vent_ID = ?`
      const [result] = await connection.getConnection().execute(query, [id])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al eliminar el pago', error)
      return false
    }
  }
}

export default PagoRepository
