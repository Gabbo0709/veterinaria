import Producto from '../../models/producto.model.js'
import Connection from '../connection.js'

class ProductoRepository {
  /**
     * @type {string}
     * Nombre de la tabla en la base de datos.
     * @private
     * @readonly
     */
  static #TABLE = 'productos'

  /**
     * Mapea una fila obtenida en la base de datos a un objeto Producto.
     * @param {Object} row Fila obtenida de la base de datos.
     * @returns {Producto} Un objeto de tipo Producto.
     */
  static mapRowToProducto (row) {
    return new Producto(
      row.Prod_ID,
      row.Prod_Tipo,
      row.Prod_Nom,
      row.Prod_Prec,
      row.Prod_FechIn,
      row.Prod_FechCad,
      row.Prov_ID
    )
  }

  constructor (dbUser, dbPassword) {
    this.user = dbUser
    this.password = dbPassword
  }

  /**
     * Recupera todos los productos de la base de datos utilizando la conexión del usuario.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<Producto[]>} Una promesa que devuelve un arreglo de productos.
     */
  async getAll () {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${ProductoRepository.#TABLE}`
      const [rows] = await connection.getConnection().query(query)
      return rows.map(row => ProductoRepository.mapRowToProducto(row))
    } catch (error) {
      console.error('Error al recuperar los productos', error)
    }
  }

  /**
     * Recupera un producto de la base de datos por su ID.
     * @param {number} id ID del producto.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<Producto> | null} Una promesa que devuelve un objeto de tipo Producto o null si no se encontró el producto.
    */
  async getProducto (id) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `SELECT * FROM ${ProductoRepository.#TABLE} WHERE Prod_ID = ?`
      const [rows] = await connection.getConnection().execute(query, [id])
      return ProductoRepository.mapRowToProducto(rows[0]) // Solo se espera un resultado
    } catch (error) {
      console.error('Error al recuperar el producto', error)
      return null
    }
  }

  /**
     * Inserta un nuevo producto en la base de datos.
     * @param {Producto} producto Objeto de tipo Producto.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     * @returns {Promise<number>} Una promesa que devuelve el ID del producto insertado.
     */
  async create (producto) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `INSERT INTO ${ProductoRepository.#TABLE} (Prod_Tipo, Prod_Nom, Prod_Prec, Prod_FechIn, Prod_FechCad, Prov_ID) VALUES (?, ?, ?, ?, ?, ?)`
      const values = [producto.tipo, producto.nombre, producto.precio, producto.fechaIngreso, producto.fechaCaducidad, producto.proveedorId]
      const [result] = await connection.getConnection().execute(query, values)
      return result.insertId
    } catch (error) {
      console.error('Error al insertar el producto', error)
      return -1
    }
  }

  /**
     * Actualiza un producto en la base de datos a partir de su ID.
     *
     * @param {Producto} producto Objeto de tipo Producto.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     *
     * @returns {Promise<boolean>} Una promesa que devuelve true si el producto se actualizó correctamente, false en caso contrario.
     */
  async update (producto) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `UPDATE ${ProductoRepository.#TABLE} SET Prod_Tipo = ?, Prod_Nom = ?, Prod_Prec = ?, Prod_FechIn = ?, Prod_FechCad = ?, Prov_ID = ? WHERE Prod_ID = ?`
      const values = [producto.tipo, producto.nombre, producto.precio, producto.fechaIngreso, producto.fechaCaducidad, producto.proveedorId, producto.id]
      const [result] = await connection.getConnection().execute(query, values)
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al actualizar el producto', error)
      return false
    }
  }

  /**
     * Elimina un producto de la base de datos a partir de su ID.
     *
     * @param {number} id ID del producto.
     * @param {mysql.Connection} connection Conexión a la base de datos.
     *
     * @returns {Promise<boolean>} Una promesa que devuelve true si el producto se eliminó correctamente, false en caso contrario.
     */
  async delete (id) {
    try {
      const connection = await Connection.getInstance(this.user, this.password)
      const query = `DELETE FROM ${ProductoRepository.#TABLE} WHERE Prod_ID = ?`
      const [result] = await connection.getConnection().execute(query, [id])
      return result.affectedRows > 0
    } catch (error) {
      console.error('Error al eliminar el producto', error)
      return false
    }
  }
}

export default ProductoRepository
