import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext"
import PublicacionBlogService from "#services/PublicacionBlogService"

export default class PublicacionBlogController {
  private service = new PublicacionBlogService()

  // Crear publicación con archivos
  public async crear({ request, auth, response }: HttpContextContract) {
    try {
      const usuario = auth.user
      if (!usuario) return response.unauthorized({ message: "No autenticado" })

      // Archivos de multipart/form-data
      const imagen = request.file("imagen")
      const archivo = request.file("archivo")

      const payload = request.only(["titulo", "descripcion", "id_empresa"])

      const blog = await this.service.crear({
        ...payload,
        imagen,
        archivo,
        id_usuario: usuario.id,
        nombre_usuario: usuario.nombre,
      })

      return response.created(blog)
    } catch (error) {
      return response.badRequest({ message: "Error al crear la publicación", error })
    }
  }

  public async listarTodos({ response }: HttpContextContract) {
    try {
      const blogs = await this.service.listarTodos()
      return response.ok(blogs)
    } catch (error) {
      return response.badRequest({ message: "Error al listar publicaciones", error })
    }
  }

  public async listarPorUsuario({ auth, response }: HttpContextContract) {
    try {
      const usuario = auth.user
      if (!usuario) return response.unauthorized({ message: "No autenticado" })

      const blogs = await this.service.listarPorUsuario(usuario.id)
      return response.ok(blogs)
    } catch (error) {
      return response.badRequest({ message: "Error al listar publicaciones", error })
    }
  }

  public async listarPorEmpresa({ request, response }: HttpContextContract) {
    try {
      const { id_empresa } = request.qs()
      if (!id_empresa) return response.badRequest({ message: "id_empresa es requerido" })

      const blogs = await this.service.listarPorEmpresa(Number(id_empresa))
      return response.ok(blogs)
    } catch (error) {
      return response.badRequest({ message: "Error al listar publicaciones por empresa", error })
    }
  }

  public async obtenerPorId({ params, response }: HttpContextContract) {
    try {
      const blog = await this.service.obtenerPorId(Number(params.id))
      if (!blog) return response.notFound({ message: "Publicación no encontrada" })
      return response.ok(blog)
    } catch (error) {
      return response.badRequest({ message: "Error al obtener la publicación", error })
    }
  }

  public async actualizar({ params, request, response }: HttpContextContract) {
    try {
      const imagen = request.file("imagen")
      const archivo = request.file("archivo")
      const payload = request.only(["titulo", "descripcion", "id_empresa", "fecha_actividad"])

      if (imagen) payload.imagen = imagen
      if (archivo) payload.archivo = archivo

      const blog = await this.service.actualizar(Number(params.id), payload)
      return response.ok(blog)
    } catch (error) {
      return response.badRequest({ message: "Error al actualizar la publicación", error })
    }
  }

  public async eliminar({ params, response }: HttpContextContract) {
    try {
      const result = await this.service.eliminar(Number(params.id))
      return response.ok(result)
    } catch (error) {
      return response.badRequest({ message: "Error al eliminar la publicación", error })
    }
  }
}
