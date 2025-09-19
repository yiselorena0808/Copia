// app/Controllers/Http/DashboardController.ts
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Reporte from '#models/reporte'
import Usuario from '#models/usuario'

export default class DashboardController {
  public async funcionalidades({ request, response }: HttpContextContract) {
    try {
      const usuario = (request as any).user
      if (!usuario) return response.status(401).json({ error: 'Usuario no autenticado' })

      // Contar reportes creados por la empresa
      const totalCrearReporte = await Reporte.query()
        .where('id_empresa', usuario.id_empresa)
        .count('* as total')
        .first()

      // Contar reportes listados (simulación)
      const totalListarReportes = await Reporte.query()
        .where('id_empresa', usuario.id_empresa)
        .count('* as total')
        .first()

      // Simulación de otras funcionalidades
      const totalActualizarUsuario = await Usuario.query()
        .where('id_empresa', usuario.id_empresa)
        .count('* as total')
        .first()

      const totalEliminarUsuario = await Usuario.query()
        .where('id_empresa', usuario.id_empresa)
        .count('* as total')
        .first()

      return response.json({
        datos: [
          { nombre: 'Crear Reporte', total: Number(totalCrearReporte?.$extras.total || 0) },
          { nombre: 'Listar Reportes', total: Number(totalListarReportes?.$extras.total || 0) },
          { nombre: 'Actualizar Usuario', total: Number(totalActualizarUsuario?.$extras.total || 0) },
          { nombre: 'Eliminar Usuario', total: Number(totalEliminarUsuario?.$extras.total || 0) },
        ]
      })
    } catch (error) {
      console.error('Error dashboard:', error)
      return response.status(500).json({ error: 'Error al obtener datos del dashboard' })
    }
  }
}
