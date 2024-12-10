import Proveedor from '../../models/proveedor.model'

class ProveedorRepository {
  /**
     * @type {string}
     * Nombre de la tabla en la base de datos.
     * @private
     * @readonly
     */
  static #TABLE = 'proveedores'

  /**
     * Mapea una fila obtenida en la base de datos a un objeto Proveedor.
     * @param {Object} row Fila obtenida de la base de datos.
     * @returns {Proveedor} Un objeto de tipo Proveedor.
     */
  static mapRowToProveedor (row) {
    return new Proveedor(
      row.Prov_ID,
      row.Prov_Nom,
      row.Prov_Cont,
      row.Prov_Dire,
      row.Prov_Tel,
      row.Prov_TSum
    )
  }

  /**
     * Recupera todos los proveedores de la base de datos utilizando la conexión del usuario.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<Proveedor[]>} Una promesa que devuelve un arreglo de proveedores.
     */
  async getAll (connection) {
    try {
      const query = `SELECT * FROM ${ProveedorRepository.#TABLE}`
      const [rows] = await connection.query(query)
      return rows.map(row => ProveedorRepository.mapRowToProveedor(row))
    } catch (error) {
      console.error('Error al recuperar los proveedores', error)
    }
  }

  /**
     * Recupera un proveedor de la base de datos por su ID.
     * @param {number} id ID del proveedor.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<Proveedor> | null} Una promesa que devuelve un objeto de tipo Proveedor o null si no se encontró el proveedor.
    */
  async getProveedor (id, connection) {
    try {
      const query = `SELECT * FROM ${ProveedorRepository.#TABLE} WHERE Prov_ID = ?`
      const [rows] = await connection.execute(query, [id])
      return ProveedorRepository.mapRowToProveedor(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar el proveedor', error)
      return null
    }
  }

  /**
     * Inserta un nuevo proveedor en la base de datos.
     * @param {Proveedor} proveedor Objeto de tipo Proveedor.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<number>} Una promesa que devuelve el ID del proveedor insertado.
     */
  async create (proveedor, connection) {
    try {
      const query = `INSERT INTO ${ProveedorRepository.#TABLE} (Prov_Nom, Prov_Cont, Prov_Dire, Prov_Tel, Prov_TSum) VALUES (?, ?, ?, ?, ?)`
      const values = [proveedor.nombre, proveedor.contacto, proveedor.direccion, proveedor.telefono, proveedor.tipoProducto]
      const [result] = await connection.execute(query, values)
      return result.insertId
    } catch (error) {
      console.error('Error al insertar el proveedor', error)
      return -1
    }
  }

  /**
     * Actualiza un proveedor en la base de datos a partir de su ID.
     *
     * @param {Proveedor} proveedor Objeto de tipo Proveedor.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     *
     * @returns {Promise<boolean>} Una promesa que devuelve true si el proveedor se actualizó correctamente, false en caso contrario.
     */
  async update (proveedor, connection) {
    try {
      const query = `UPDATE ${ProveedorRepository.#TABLE} SET Prov_Nom = ?, Prov_Cont = ?, Prov_Dire = ?, Prov_Tel = ?, Prov_TSum = ? WHERE Prov_ID = ?`
      const values = [proveedor.nombre, proveedor.contacto, proveedor.direccion, proveedor.telefono, proveedor.tipoProducto, proveedor.id]
      const [result] = await connection.execute(query, values)
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al actualizar el proveedor', error)
      return false
    }
  }

  /**
     * Elimina un proveedor de la base de datos a partir de su ID.
     *
     * @param {number} id ID del proveedor.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     *
     * @returns {Promise<boolean>} Una promesa que devuelve true si el proveedor se eliminó correctamente, false en caso contrario.
     */
  async delete (id, connection) {
    try {
      const query = `DELETE FROM ${ProveedorRepository.#TABLE} WHERE Prov_ID = ?`
      const [result] = await connection.execute(query, [id])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al eliminar el proveedor', error)
      return false
    }
  }
}

export default ProveedorRepository
