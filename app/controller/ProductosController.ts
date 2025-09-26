// app/Controllers/Http/ProductosController.ts
import ProductoService from "#services/ProductoService"

const service = new ProductoService()

export default class ProductosController {
  async listar({ response }) {
    const productos = await service.listar()
    return response.json(productos)
  }

  async crear({ request, response }) {
    const data = request.only(['nombre', 'descripcion', 'id_cargo', 'estado'])
    const producto = await service.crear(data)
    return response.created(producto)
  }

  async actualizar({ params, request, response }) {
    const data = request.only(['nombre', 'descripcion', 'id_cargo', 'estado'])
    const producto = await service.actualizar(params.id, data)
    return response.json(producto)
  }

  async eliminar({ params, response }) {
    await service.eliminar(params.id)
    return response.json({ message: 'Producto eliminado' })
  }

  public async listarPorCargo(id_cargo: number) {
  return await Producto.query().where('id_cargo', id_cargo).andWhere('estado', 'activo');

}

}
