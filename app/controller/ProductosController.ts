import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ProductoService from '#services/ProductoService'

export default class ProductosController {
  private productoService = new ProductoService()

  // Crear producto
  public async crear({ request, response }: HttpContextContract) {
    try {
      const datos = request.only(['nombre', 'descripcion', 'cargo_asignado', 'estado'])
      const producto = await this.productoService.crear(datos)
      return response.created(producto)
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }

  // Listar todos los productos
  public async listar({ response }: HttpContextContract) {
    try {
      const productos = await this.productoService.listar()
      return response.ok(productos)
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }

  // Listar productos por nombre de cargo
  public async listarPorCargo({ params, response }: HttpContextContract) {
    try {
      const nombreCargo = params.nombreCargo // ahora es string
      const productos = await this.productoService.listarPorCargoNombre(nombreCargo)
      return response.ok(productos)
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }

  // Actualizar producto
  public async actualizar({ params, request, response }: HttpContextContract) {
    try {
      const id = Number(params.id)
      const datos = request.only(['nombre', 'descripcion', 'cargo_asignado', 'estado'])
      const producto = await this.productoService.actualizar(id, datos)
      return response.ok(producto)
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }

  // Eliminar producto
  public async eliminar({ params, response }: HttpContextContract) {
    try {
      const id = Number(params.id)
      const resultado = await this.productoService.eliminar(id)
      return response.ok(resultado)
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }
}
