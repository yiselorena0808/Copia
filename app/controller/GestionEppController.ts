import type { HttpContext } from '@adonisjs/core/http'
import GestionEppService from '#services/GestionEppService'

const gestionService = new GestionEppService()

export default class GestionEppController {
  async crear({ request, response }: HttpContext) {
    try {
      const usuario = (request as any).user
      if (!usuario) {
        return response.status(401).json({ error: 'Usuario no autenticado' })
      }

      const datos = request.only([
        'id_usuario',
        'nombre',
        'apellido',
        'cedula',
        'id_cargo',
        'productos',
        'importancia',
        'estado',
        'fecha_creacion',
        'id_empresa',
        'id_area',
      ])

      datos.id_usuario = usuario.id
      datos.nombre = usuario.nombre
      datos.apellido = usuario.apellido
      datos.id_empresa = usuario.id_empresa
      datos.id_area = usuario.id_area || null

      // Estado por defecto si no viene
      if (!datos.estado) datos.estado = 'Pendiente'

      const gestion = await gestionService.crearGestionEpp(datos)

      return response.status(201).json({ mensaje: 'Gestión EPP creada', gestion })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async listar({ request, response }: HttpContext) {
    try {
      const usuario = (request as any).user
      const empresaId = usuario.id_empresa

      const gestiones = await gestionService.listarGestiones(empresaId)
      return response.json({ datos: gestiones })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async mostrar({ params, request, response }: HttpContext) {
    try {
      const usuario = (request as any).user
      const empresaId = usuario.id_empresa

      const gestion = await gestionService.obtenerGestionPorId(params.id, empresaId)
      return response.json(gestion)
    } catch (error) {
      return response.status(404).json({ error: 'Gestión no encontrada' })
    }
  }

  async actualizar({ params, request, response }: HttpContext) {
    try {
      const usuario = (request as any).user
      const empresaId = usuario.id_empresa

      const datos = request.only([
        'id_usuario',
        'nombre',
        'apellido',
        'cedula',
        'id_cargo',
        'productos',
        'importancia',
        'estado',
        'fecha_creacion',
        'id_empresa',
        'id_area',
      ])

      // Mantener consistencia desde JWT
      datos.id_usuario = usuario.id
      datos.nombre = usuario.nombre
      datos.apellido = usuario.apellido
      datos.id_empresa = empresaId

      const gestion = await gestionService.actualizarGestion(params.id, empresaId, datos)
      return response.json({ mensaje: 'Gestión EPP actualizada', gestion })
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }

  async eliminar({ params, request, response }: HttpContext) {
    try {
      const usuario = (request as any).user
      const empresaId = usuario.id_empresa

      const resultado = await gestionService.eliminarGestion(params.id, empresaId)
      return response.json(resultado)
    } catch (error) {
      return response.status(400).json({ error: error.message })
    }
  }
}
