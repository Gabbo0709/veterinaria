import Veterinario from '../../models/veterinario.model.js'
import Connection from '../connection.js'

class VeterinariosRepository {
  /**
   * @type {string}
   * Nombre de la tabla en la base de datos.
   * @private
   * @readonly
   */
  static #TABLE = 'veterinarios'

  /**
   * Mapea una fila obtenida en la base de datos a un objeto Veterinario.
   * @param {Object} row Fila obtenida de la base de datos.
   * @returns {Veterinario} Un objeto de tipo Veterinario.
   */
  static mapRowToVeterinario (row) {
    return new Veterinario(
      row.Vet_CURP,
      row.Vet_Nom,
      row.Vet_Tel,
      row.Vet_Direc,
      row.Vet_RFC,
      row.Vet_NSS,
      row.Vet_Esp
    )
  }

  constructor (dbUsuario, dbPassword) {
    this.dbUsuario = dbUsuario
    this.dbPassword = dbPassword
  }

  /**
   * Recupera todos los veterinarios de la base de datos utilizando la conexión del usuario.
   * @param {Connection} connection Conexión a la base de datos.
   * @returns {Promise<Veterinario[]>} Una promesa que devuelve un arreglo de veterinarios.
   */
  async getAll () {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${VeterinariosRepository.#TABLE}`
      const [rows] = await connection.getConnection().query(query)
      return rows.map(row => VeterinariosRepository.mapRowToVeterinario(row))
    } catch (error) {
      console.error('Error al recuperar los veterinarios', error)
    }
  }

  /**
   * Recupera un veterinario de la base de datos por su CURP.
   * @param {string} vetCurp CURP del veterinario.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<Veterinario> | null} Una promesa que devuelve un objeto de tipo Veterinario o null si no se encontró el veterinario.
   */
  async getVeterinario (vetCurp) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${VeterinariosRepository.#TABLE} WHERE Vet_CURP = ?`
      const [rows] = await connection.getConnection().execute(query, [vetCurp])
      return VeterinariosRepository.mapRowToVeterinario(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar el veterinario', error)
      return null
    }
  }

  /**
   * Crea un nuevo veterinario en la base de datos.
   * @param {Veterinario} veterinario Un objeto de tipo Veterinario.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<string>} Una promesa que devuelve el CURP del veterinario creado.
  */
  async create (veterinario) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `INSERT INTO ${VeterinariosRepository.#TABLE} (Vet_CURP, Vet_Nom, Vet_Tel, Vet_Direc, Vet_RFC, Vet_NSS, Vet_Esp) VALUES (?, ?, ?, ?, ?, ?, ?)`
      const result = await connection.getConnection().execute(query, [
        veterinario.curp,
        veterinario.nombre,
        veterinario.telefono,
        veterinario.direccion,
        veterinario.rfc,
        veterinario.nss,
        veterinario.especialidad
      ])
      return result.insertId
    } catch (error) {
      console.error('Error al crear el veterinario', error)
      return null
    }
  }

  /**
   * Actualiza un veterinario en la base de datos.
   * @param {Veterinario} veterinario Un objeto de tipo Veterinario.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<boolean>} Una promesa que indica si la actualización fue exitosa.
  */
  async update (veterinario) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `UPDATE ${VeterinariosRepository.#TABLE} SET Vet_Nom = ?, Vet_Tel = ?, Vet_Direc = ?, Vet_RFC = ?, Vet_NSS = ?, Vet_Esp = ? WHERE Vet_CURP = ?`
      const result = await connection.getConnection().execute(query, [
        veterinario.nombre,
        veterinario.telefono,
        veterinario.direccion,
        veterinario.rfc,
        veterinario.nss,
        veterinario.especialidad,
        veterinario.curp
      ])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al actualizar el veterinario', error)
      return false
    }
  }

  /**
     * Elimina un veterinario de la base de datos.
     * @param {string} vetCurp CURP del veterinario.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<boolean>} Una promesa que indica si la eliminación fue exitosa.
    */
  async delete (vetCurp) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `DELETE FROM ${VeterinariosRepository.#TABLE} WHERE Vet_CURP = ?`
      const result = await connection.getConnection().execute(query, [vetCurp])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al eliminar el veterinario', error)
      return false
    }
  }
}

export default VeterinariosRepository
