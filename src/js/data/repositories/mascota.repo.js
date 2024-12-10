import Mascota from '../../models/mascota.model'

class MascotaRepository {
  /**
   * @type {string}
   * Nombre de la tabla en la base de datos.
   * @private
   * @readonly
   */
  static #TABLE = 'mascotas'

  /**
   * Mapea una fila obtenida en la base de datos a un objeto Mascota.
   * @param {Object} row Fila obtenida de la base de datos.
   * @returns {Mascota} Un objeto de tipo Mascota.
   */
  static mapRowToMascota (row) {
    return new Mascota(
      row.Mas_ID,
      row.Mas_Nom,
      row.Mas_Edad,
      row.Mas_Sex,
      row.Mas_Peso,
      row.Mas_Est,
      row.Mas_Esp,
      row.HisM_ID,
      row.Cli_ID
    )
  }

  /**
   * Recupera todas las mascotas de la base de datos utilizando la conexión del usuario.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<Mascota[]>} Una promesa que devuelve un arreglo de mascotas.
   */
  async getAll (connection) {
    try {
      const query = `SELECT * FROM ${MascotaRepository.#TABLE}`
      const [rows] = await connection.query(query)
      return rows.map(row => MascotaRepository.mapRowToMascota(row))
    } catch (error) {
      console.error('Error al recuperar las mascotas', error)
    }
  }

  /**
   * Recupera una mascota de la base de datos por su ID.
   * @param {number} masId ID de la mascota.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<Mascota> | null} Una promesa que devuelve un objeto de tipo Mascota o null si no se encontró la mascota.
   */
  async getMascota (masId, connection) {
    try {
      const query = `SELECT * FROM ${MascotaRepository.#TABLE} WHERE Mas_ID = ?`
      const [rows] = await connection.execute(query, [masId])
      return MascotaRepository.mapRowToMascota(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar la mascota', error)
      return null
    }
  }

  /**
   * Crea una nueva mascota en la base de datos.
   * @param {Mascota} mascota Un objeto de tipo Mascota.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<number>} Una promesa que devuelve el ID de la mascota creada.
   */
  async create (mascota, connection) {
    try {
      const query = `INSERT INTO ${MascotaRepository.#TABLE} (Mas_Nom, Mas_Edad, Mas_Sex, Mas_Peso, Mas_Est, Mas_Esp, HisM_ID, Cli_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      const [result] = await connection.execute(query, [mascota.nombre, mascota.edad, mascota.sexo, mascota.peso, mascota.estado, mascota.especie, mascota.historialMedico, mascota.cliente])
      return result.insertId
    } catch (error) {
      console.error('Error al crear la mascota', error)
      return -1
    }
  }

  /**
   * Actualiza una mascota en la base de datos.
   * @param {Mascota} mascota Un objeto de tipo Mascota.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<number>} Una promesa que devuelve el número de filas afectadas.
   */
  async update (mascota, connection) {
    try {
      const query = `UPDATE ${MascotaRepository.#TABLE} SET Mas_Nom = ?, Mas_Edad = ?, Mas_Sex = ?, Mas_Peso = ?, Mas_Est = ?, Mas_Esp = ?, HisM_ID = ?, Cli_ID = ? WHERE Mas_ID = ?`
      const [result] = await connection.execute(query, [mascota.nombre, mascota.edad, mascota.sexo, mascota.peso, mascota.estado, mascota.especie, mascota.historialMedico, mascota.cliente, mascota.id])
      return result.affectedRows
    } catch (error) {
      console.error('Error al actualizar la mascota', error)
      return -1
    }
  }

  /**
   * Elimina una mascota de la base de datos.
   * @param {number} masId ID de la mascota.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<number>} Una promesa que devuelve el número de filas afectadas.
   */
  async delete (masId, connection) {
    try {
      const query = `DELETE FROM ${MascotaRepository.#TABLE} WHERE Mas_ID = ?`
      const [result] = await connection.execute(query, [masId])
      return result.affectedRows
    } catch (error) {
      console.error('Error al eliminar la mascota', error)
      return -1
    }
  }
}

export default MascotaRepository
