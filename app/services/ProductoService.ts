// app/Services/ProductoService.ts
import Producto from '#models/producto'
import { Exception } from '@adonisjs/core/exceptions'

export default class ProductoService {
  /**
   * Listar todos los productos
   */
  async listar() {
    return await Producto.query().preload('cargo') // trae también el cargo
  }

  /**
   * Crear un producto
   */
  async crear(data: Partial<Producto>) {
    const productoExistente = await Producto.findBy('nombre', data.nombre)
    if (productoExistente) {
      throw new Exception('El producto ya existe', { status: 400 })
    }

    return await Producto.create(data)
  }

  /**
   * Actualizar un producto
   */
  async actualizar(id_producto: number, data: Partial<Producto>) {
    const producto = await Producto.findOrFail(id_producto)
    producto.merge(data)
    await producto.save()
    return producto
  }

  /**
   * Eliminar un producto
   */
  async eliminar(id_producto: number) {
    const producto = await Producto.findOrFail(id_producto)
    await producto.delete()
  }

  /**
   * Listar productos por cargo (id_cargo)
   */
  async listarPorCargo(id_cargo: number) {
    return await Producto.query().where('id_cargo', id_cargo).preload('cargo')
  }
}
