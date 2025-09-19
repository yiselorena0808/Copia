import type { HttpContext } from "@adonisjs/core/http"
import GestionEppService from "#services/GestionEppService"

const service = new GestionEppService()

export default class GestionEppController {
   public async crear({ request, response }: HttpContextContract) {
    try {
      const usuario = (request as any).user // token decodificado por middleware

      // Solo tomar los campos que vienen del frontend
      const datos = request.only([
        "cedula",
        "id_cargo",
        "id_producto",
        "importancia",
        "estado",
        "fecha_creacion",
      ])

      // Agregar datos del usuario
      datos['id_usuario'] = usuario.id
      datos['nombre'] = usuario.nombre
      datos['apellido'] = usuario.apellido
      datos['id_empresa'] = usuario.id_empresa

      const gestion = await service.crearGestionEpp(datos)
      return response.created(gestion)
    } catch (error: any) {
      return response.badRequest({ error: error.message })
    }
  }

  public async listar({ request, response }: HttpContext) {
    try {
      const usuario = (request as any).user
      const gestiones = await service.listarGestiones(usuario.id_empresa)
      return response.ok(gestiones)
    } catch (error) {
      return response.badRequest({ error: error.message })
    }
  }
}
