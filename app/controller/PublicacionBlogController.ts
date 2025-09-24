import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PublicacionBlogService from '#services/PublicacionBlogService'

export default class PublicacionBlogController {
  private service: PublicacionBlogService

  constructor() {
    // Aseguramos que siempre exista la instancia del servicio
    this.service = new PublicacionBlogService()
  }

  public async crear({ request, response, auth }: HttpContextContract) {
    try {
      const usuario = auth.user // Usar el auth oficial en lugar de (request as any).user
      if (!usuario) {
        return response.unauthorized({ error: 'No autenticado' })
      }

      const imagen = request.file('imagen')
      const archivo = request.file('archivo')
      const payload = request.only(['titulo', 'descripcion', 'fecha_actividad'])

      const blog = await this.service.crear({
        ...payload,
        id_usuario: usuario.id,
        nombre_usuario: usuario.nombre,
        id_empresa: usuario.id_empresa,
        imagen,
        archivo,
      })

      return response.created(blog)
    } catch (error: any) {
      console.error('Error en crear publicación:', error) // 👈 log en servidor
      return response.badRequest({
        error: 'No se pudo crear la publicación',
        details: error.message || error,
      })
    }
  }

  public async listarTodos({ response }: HttpContextContract) {
    const blogs = await this.service.listarTodos()
    return response.ok(blogs)
  }

  public async listarPorUsuario({ auth, response }: HttpContextContract) {
    const usuario = auth.user
    if (!usuario) {
      return response.unauthorized({ error: 'No autenticado' })
    }

    const blogs = await this.service.listarPorUsuario(usuario.id)
    return response.ok(blogs)
  }

  public async listarPorEmpresa({ request, response }: HttpContextContract) {
    const id_empresa = Number(request.qs().id_empresa)
    if (!id_empresa) {
      return response.badRequest({ error: 'id_empresa es requerido' })
    }

    const blogs = await this.service.listarPorEmpresa(id_empresa)
    return response.ok(blogs)
  }

  public async actualizar({ params, request, response }: HttpContextContract) {
    const imagen = request.file('imagen')
    const archivo = request.file('archivo')
    const payload: any = request.only(['titulo', 'descripcion', 'fecha_actividad'])

    if (imagen) payload.imagen = imagen
    if (archivo) payload.archivo = archivo

    const blog = await this.service.actualizar(Number(params.id), payload)
    return response.ok(blog)
  }

  public async eliminar({ params, response }: HttpContextContract) {
    const result = await this.service.eliminar(Number(params.id))
    return response.ok(result)
  }
}
