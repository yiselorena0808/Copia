import Producto from "#models/producto"

export default class ProductoService {
  // Crear producto
  public async crear(datos: any) {
    const producto = await Producto.create(datos)
    return producto
  }

  // Listar todos los productos
  public async listar() {
    const productos = await Producto.query().orderBy('id_producto', 'asc')
    return productos
  }

  // Listar productos por nombre de cargo (string)
  public async listarPorCargoNombre(nombreCargo: string) {
    const productos = await Producto.query()
      .where('cargo_asignado', nombreCargo)
      .orderBy('id_producto', 'asc')
    return productos
  }

  // Actualizar producto
  public async actualizar(id: number, datos: any) {
    const producto = await Producto.findOrFail(id)
    producto.merge(datos)
    await producto.save()
    return producto
  }

  // Eliminar producto
  public async eliminar(id: number) {
    const producto = await Producto.findOrFail(id)
    await producto.delete()
    return { mensaje: 'Producto eliminado correctamente' }
  }
}
