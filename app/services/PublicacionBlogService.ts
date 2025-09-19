import PublicacionBlog from "#models/publicacion_blog"
import cloudinary from "#config/cloudinary"

interface BlogData {
  titulo?: string
  descripcion?: string
  imagen?: any       // archivo subido
  archivo?: any      // archivo subido
  id_empresa?: number
  fecha_actividad?: Date
  id_usuario?: number
  nombre_usuario?: string
}

export default class PublicacionBlogService {
  public async crear(data: BlogData) {
    let urlImagen: string | undefined
    let urlArchivo: string | undefined

    // Subir imagen a Cloudinary
    if (data.imagen) {
      const result = await cloudinary.uploader.upload(data.imagen.tmpPath, {
        folder: "publicaciones",
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      })
      urlImagen = result.secure_url
    }

    // Subir archivo a Cloudinary (PDF, DOCX, etc.)
    if (data.archivo) {
      const result = await cloudinary.uploader.upload(data.archivo.tmpPath, {
        folder: "archivos_publicaciones",
        resource_type: "raw",
        upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
      })
      urlArchivo = result.secure_url
    }

    const blog = await PublicacionBlog.create({
      ...data,
      imagen: urlImagen,
      archivo: urlArchivo,
      fecha_actividad: data.fecha_actividad || new Date(),
    })

    // Notificación en tiempo real
    import("@ioc:Adonis/Addons/Ws").then(Ws => Ws.io.emit("nueva-publicacion", blog))

    return blog
  }

  public async listarTodos() {
    return PublicacionBlog.query()
  }

  public async listarPorUsuario(id_usuario: number) {
    return PublicacionBlog.query().where("id_usuario", id_usuario)
  }

  public async listarPorEmpresa(id_empresa: number) {
    return PublicacionBlog.query().where("id_empresa", id_empresa)
  }

  public async obtenerPorId(id: number) {
    return PublicacionBlog.find(id)
  }

  public async actualizar(id: number, data: BlogData) {
    const blog = await PublicacionBlog.findOrFail(id)
    blog.merge(data)
    await blog.save()
    return blog
  }

  public async eliminar(id: number) {
    const blog = await PublicacionBlog.findOrFail(id)
    await blog.delete()
    return { message: "Publicación eliminada correctamente" }
  }
}

