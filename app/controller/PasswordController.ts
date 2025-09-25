import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductoService from '#services/ProductoService'

const productoService = new ProductoService()

export default class ProductosController {
  public async listar({ response }: HttpContextContract) {
    const data = await productoService.listar()
    return response.json(data)
  }

  public async crear({ request, response }: HttpContextContract) {
    const data = request.only(['nombre', 'descripcion', 'id_cargo', 'estado'])
    const nuevo = await productoService.crear(data)
    return response.json(nuevo)
  }

  public async actualizar({ params, request, response }: HttpContextContract) {
    const data = request.only(['nombre', 'descripcion', 'id_cargo', 'estado'])
    const actualizado = await productoService.actualizar(params.id, data)
    return response.json(actualizado)
  }

  public async eliminar({ params, response }: HttpContextContract) {
    const eliminado = await productoService.eliminar(params.id)
    return response.json(eliminado)
  }

  public async getByCargo({ params, response }: HttpContextContract) {
    const productos = await productoService.getByCargo(params.id)
    return response.json(productos)
  }

  public async getByCargoNombre({ params, response }: HttpContextContract) {
    const productos = await productoService.getByCargoNombre(params.nombre)
    return response.json(productos)
  }
}
