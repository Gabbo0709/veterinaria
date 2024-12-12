import HistorialMedico from '../../models/historial-medico.model.js'
import Connection from '../connection.js'

class HistorialMedicoRepository {
  /**
     * @type {string}
     * Nombre de la tabla en la base de datos.
     * @private
     * @readonly
     */
  static #TABLE = 'historial_medico'

  /**
     * Mapea una fila obtenida en la base de datos a un objeto HistorialMedico.
     * @param {Object} row Fila obtenida de la base de datos.
     * @returns {HistorialMedico} Un objeto de tipo HistorialMedico.
     */
  static mapRowToHistorialMedico (row) {
    return new HistorialMedico(
      row.HisM_ID,
      row.HisM_Alerg,
      row.HisM_Diag,
      row.HisM_DurT,
      row.HisM_Med,
      row.Vet_CURP
    )
  }

  constructor (dbUser, dbPassword) {
    this.user = dbUser
    this.password = dbPassword
  }

  /**
     * Recupera todos los historiales médicos de la base de datos utilizando la conexión del usuario.
     * @param {Connection} connection Conexión a la base de datos.
     * @returns {Promise<HistorialMedico[]>} Una promesa que devuelve un arreglo de historiales médicos.
     */
  async getAll () {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${HistorialMedicoRepository.#TABLE}`
      const [rows] = await connection.getConnection().query(query)
      return rows.map(row => HistorialMedicoRepository.mapRowToHistorialMedico(row))
    } catch (error) {
      console.error('Error al recuperar los historiales médicos', error)
    }
  }

  /**
     * Recupera un historial médico de la base de datos por su ID.
     * @param {number} hisId ID del historial médico.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<HistorialMedico> | null} Una promesa que devuelve un objeto de tipo HistorialMedico o null si no se encontró el historial médico.
     */
  async getHistorialMedico (hisId) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${HistorialMedicoRepository.#TABLE} WHERE HisM_ID = ?`
      const [rows] = await connection.getConnection().execute(query, [hisId])
      return HistorialMedicoRepository.mapRowToHistorialMedico(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar el historial médico', error)
      return null
    }
  }

  /**
     * Crea un nuevo historial médico en la base de datos.
     * @param {HistorialMedico} historialMedico Un objeto de tipo HistorialMedico.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<number>} Una promesa que devuelve el ID del historial médico creado.
     */
  async create (historialMedico) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `INSERT INTO ${HistorialMedicoRepository.#TABLE} (HisM_Alerg, HisM_Diag, HisM_DurT, HisM_Med, Vet_CURP) VALUES (?, ?, ?, ?, ?)`
      const [result] = await connection.getConnection().execute(query, [historialMedico.alergia, historialMedico.diagnostico, historialMedico.duracionTratamiento, historialMedico.medicina, historialMedico.veterinarioCurp])
      return result.insertId
    } catch (error) {
      console.error('Error al crear el historial médico', error)
      return null
    }
  }

  /**
     * Actualiza un historial médico en la base de datos.
     * @param {HistorialMedico} historialMedico Un objeto de tipo HistorialMedico.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<boolean>} Una promesa que devuelve true si se actualizó el historial médico.
     */
  async update (historialMedico) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `UPDATE ${HistorialMedicoRepository.#TABLE} SET HisM_Alerg = ?, HisM_Diag = ?, HisM_DurT = ?, HisM_Med = ?, Vet_CURP = ? WHERE HisM_ID = ?`
      const values = [historialMedico.alergia, historialMedico.diagnostico, historialMedico.duracionTratamiento, historialMedico.medicina, historialMedico.veterinarioCurp, historialMedico.id]
      await connection.getConnection().execute(query, values)
      return true
    } catch (error) {
      console.error('Error al actualizar el historial médico', error)
      return false
    }
  }

  /**
     * Elimina un historial médico de la base de datos.
     * @param {number} hisId ID del historial médico.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<boolean>} Una promesa que devuelve true si se eliminó el historial médico.
     */
  async delete (hisId) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `DELETE FROM ${HistorialMedicoRepository.#TABLE} WHERE HisM_ID = ?`
      await connection.getConnection().execute(query, [hisId])
      return true
    } catch (error) {
      console.error('Error al eliminar el historial médico', error)
      return false
    }
  }
}

export default HistorialMedicoRepository
