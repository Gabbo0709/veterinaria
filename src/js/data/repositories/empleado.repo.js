import Empleado from '../../models/empleado.model.js'
import Connection from '../connection.js'

class EmpleadoRepository {
  /**
   * @type {string}
   * Nombre de la tabla en la base de datos.
   * @private
   * @readonly
   */
  static #TABLE = 'empleados'

  /**
   * Mapea una fila obtenida en la base de datos a un objeto Empleado.
   * @param {Object} row Fila obtenida de la base de datos.
   * @returns {Empleado} Un objeto de tipo Empleado.
   */
  static mapRowToEmpleado (row) {
    return new Empleado(
      row.Empl_Curp,
      row.Empl_Nom,
      row.Empl_NSS,
      row.Empl_Tel,
      row.Empl_Fech,
      row.Empl_Cate,
      row.Empl_RFC
    )
  }

  constructor (dbUser, dbPassword) {
    this.user = dbUser
    this.password = dbPassword
  }

  /**
   * Recupera todos los empleados de la base de datos utilizando la conexión del usuario.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<Empleado[]>} Una promesa que devuelve un arreglo de empleados.
   */
  async getAll () {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${EmpleadoRepository.#TABLE}`
      const [rows] = await connection.getConnection().query(query)
      return rows.map(row => EmpleadoRepository.mapRowToEmpleado(row))
    } catch (error) {
      console.error('Error al recuperar los empleados', error)
    }
  }

  /**
   * Recupera un empleado de la base de datos por su CURP.
   * @param {string} curp CURP del empleado.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<Empleado> | null} Una promesa que devuelve un objeto de tipo Empleado o null si no se encontró el empleado.
   */
  async getEmpleado (curp) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${EmpleadoRepository.#TABLE} WHERE Empl_Curp = ?`
      const [rows] = await connection.getConnection().execute(query, [curp])
      return EmpleadoRepository.mapRowToEmpleado(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar el empleado', error)
      return null
    }
  }

  /**
   * Inserta un nuevo empleado en la base de datos.
   * @param {Empleado} empleado Objeto de tipo Empleado.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   * @returns {Promise<string>} Una promesa que devuelve el CURP del empleado insertado.
   */
  async create (empleado) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `INSERT INTO ${EmpleadoRepository.#TABLE} (Empl_Curp, Empl_Nom, Empl_NSS, Empl_Tel, Empl_Fech, Empl_Cate, Empl_RFC) VALUES (?, ?, ?, ?, ?, ?, ?)`
      const values = [empleado.curp, empleado.nombre, empleado.nss, empleado.telefono, empleado.fechaNacimiento, empleado.categoria, empleado.rfc]
      const [result] = await connection.getConnection().execute(query, values)
      return result.insertId
    } catch (error) {
      console.error('Error al insertar el empleado', error)
      return -1
    }
  }

  /**
   * Actualiza un empleado en la base de datos a partir de su CURP.
   *
   * @param {Empleado} empleado Objeto de tipo Empleado.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   *
   * @returns {Promise<boolean>} Una promesa que devuelve true si el empleado se actualizó correctamente, false en caso contrario.
   */
  async update (empleado) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `UPDATE ${EmpleadoRepository.#TABLE} SET Empl_Nom = ?, Empl_NSS = ?, Empl_Tel = ?, Empl_Fech = ?, Empl_Cate = ?, Empl_RFC = ? WHERE Empl_Curp = ?`
      const values = [empleado.nombre, empleado.nss, empleado.telefono, empleado.fechaNacimiento, empleado.categoria, empleado.rfc, empleado.curp]
      const [result] = await connection.getConnection().execute(query, values)
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al actualizar el empleado', error)
      return false
    }
  }

  /**
   * Elimina un empleado de la base de datos a partir de su CURP.
   *
   * @param {string} curp CURP del empleado.
   * @param {mysql.Connection} connection Conexión a la base de datos.
   *
   * @returns {Promise<boolean>} Una promesa que devuelve true si el empleado se eliminó correctamente, false en caso contrario.
   */
  async delete (curp) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `DELETE FROM ${EmpleadoRepository.#TABLE} WHERE Empl_Curp = ?`
      const [result] = await connection.getConnection().execute(query, [curp])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al eliminar el empleado', error)
      return false
    }
  }
}

export default EmpleadoRepository
