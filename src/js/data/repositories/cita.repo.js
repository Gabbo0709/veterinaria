import Cita from '../../models/cita.model.js'
import Connection from '../connection.js'

class CitasRepository {
  /**
   * @type {string}
   * Nombre de la tabla en la base de datos.
   * @private
   * @readonly
   */
  static #TABLE = 'citas'

  /**
   * Mapea una fila obtenida en la base de datos a un objeto Cita.
   * @param {Object} row Fila obtenida de la base de datos.
   * @returns {Cita} Un objeto de tipo Cita.
   */
  static mapRowToCita (row) {
    return new Cita(
      row.Cit_Num,
      row.Cit_Fech,
      row.Cit_Hora,
      row.Cit_Est,
      row.Cit_Mot,
      row.Cli_ID,
      row.Vet_CURP
    )
  }

  constructor (dbUser, dbPassword) {
    this.user = dbUser
    this.password = dbPassword
  }

  /**
   * Recupera todas las citas de la base de datos utilizando la conexión del usuario.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<Cita[]>} Una promesa que devuelve un arreglo de citas.
   */
  async getAll () {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${CitasRepository.#TABLE}`
      const [rows] = await connection.getConnection().query(query)
      return rows.map(row => CitasRepository.mapRowToCita(row))
    } catch (error) {
      console.error('Error al recuperar las citas', error)
    }
  }

  /**
   * Recupera una cita de la base de datos por su número.
   * @param {number} citaNum Número de la cita.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<Cita> | null} Una promesa que devuelve un objeto de tipo Cita o null si no se encontró la cita.
  */
  async getCita (citaNum) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${CitasRepository.#TABLE} WHERE Cit_Num = ?`
      const [rows] = await connection.getConnection().execute(query, [citaNum])
      console.log('Rows:', rows)
      return CitasRepository.mapRowToCita(rows[0])
    } catch (error) {
      console.error('Error al recuperar la cita', error)
      return null
    }
  }

  /**
   * Inserta una nueva cita en la base de datos.
   * @param {Cita} cita Objeto de tipo Cita.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<number>} Una promesa que devuelve el número de la cita insertada.
   */
  async create (cita) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `INSERT INTO ${CitasRepository.#TABLE} (Cit_Fech, Cit_Hora, Cit_Est, Cit_Mot, Cli_ID, Vet_CURP) VALUES (?, ?, ?, ?, ?, ?)`
      const values = [cita.fecha, cita.hora, cita.estado, cita.motivo, cita.clienteId, cita.veterinarioCurp]
      const [result] = await connection.getConnection().execute(query, values)
      return result.insertId
    } catch (error) {
      console.error('Error al insertar la cita', error)
      return -1
    }
  }

  /**
   * Actualiza una cita en la base de datos a partir de su número.
   *
   * @param {Cita} cita Objeto de tipo Cita.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   *
   * @returns {Promise<boolean>} Una promesa que devuelve true si la cita se actualizó correctamente, false en caso contrario.
   */
  async update (cita) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `UPDATE ${CitasRepository.#TABLE} SET Cit_Fech = ?, Cit_Hora = ?, Cit_Est = ?, Cit_Mot = ? WHERE Cit_Num = ?`
      const values = [cita.fecha, cita.hora, cita.estado, cita.motivo, cita.numero]
      const [result] = await connection.getConnection().execute(query, values)
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al actualizar la cita', error)
      return false
    }
  }

  /**
   * Elimina una cita de la base de datos a partir de su número.
   *
   * @param {number} citaNum Número de la cita.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   *
   * @returns {Promise<boolean>} Una promesa que devuelve true si la cita se eliminó correctamente, false en caso contrario.
   */
  async delete (citaNum) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `DELETE FROM ${CitasRepository.#TABLE} WHERE Cit_Num = ?`
      const [result] = await connection.getConnection().execute(query, [citaNum])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al eliminar la cita', error)
      return false
    }
  }
}

export default CitasRepository
