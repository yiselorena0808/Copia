import type { HttpContext } from '@adonisjs/core/http'
import ReporteService from '#services/ReporteService'
import cloudinary from '#config/cloudinary'
import { messages } from '@vinejs/vine/defaults'

const reporteService = new ReporteService()

class ReportesController {
  // Crear reporte
  public async crearReporte({ request, response }: HttpContext) {
    try {
      const usuario = (request as any).user
      if (!usuario) return response.status(401).json({ error: 'Usuario no autenticado' })

      const cargo = request.input('cargo')
      const cedula = request.input('cedula')
      const fecha = request.input('fecha')
      const lugar = request.input('lugar')
      const descripcion = request.input('descripcion')
      const imagen = request.file('imagen')
      const archivos = request.file('archivos')

      const reporte = await reporteService.crear({
        cargo,
        cedula,
        fecha,
        lugar,
        descripcion,
        imagen,
        archivos,
        id_usuario: usuario.id,
        id_empresa: usuario.id_empresa,
        nombre_usuario: usuario.nombre
      })

      return response.json(reporte)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ error: 'Error interno', detalle: error.message })
    }
  }

  // Listar reportes de la empresa
  public async listarReportes({ request, response }: HttpContext) {
    try {
      const usuario = (request as any).usuario
      if (!usuario) return response.unauthorized({ error: 'Usuario no autenticado' })

      const reportes = await reporteService.listar(usuario.idEmpresa)
      return response.json({ datos: reportes })
    } catch (error) {
      console.error('❌ Error al listar reportes:', error)
      return response.internalServerError({ error: 'Error al listar reportes' })
    }
  }

  // Listar reporte por ID
  public async listarReporteId({ request, params, response }: HttpContext) {
    try {
      const usuario = (request as any).usuario
      if (!usuario) return response.unauthorized({ error: 'Usuario no autenticado' })

      const reporte = await reporteService.listarId(params.id, usuario.idEmpresa)
      if (!reporte) return response.notFound({ error: 'Reporte no encontrado' })

      return response.json({ datos: reporte })
    } catch (error) {
      console.error('❌ Error al obtener reporte:', error)
      return response.internalServerError({ error: 'Error al obtener el reporte' })
    }
  }

  // Actualizar un reporte
  public async actualizarReporte({ params, request, response }: HttpContext) {
    try {
      const usuario = (request as any).usuario
      if (!usuario) return response.unauthorized({ error: 'Usuario no autenticado' })

      const datos = request.only(['cargo', 'cedula', 'fecha', 'lugar', 'descripcion', 'estado', 'nombre_usuario']) as any

      const imagenFile = request.file('imagen', { size: '20mb', extnames: ['jpg', 'jpeg', 'png', 'mp4', 'mov'] })
      const archivoFile = request.file('archivos', { size: '10mb', extnames: ['pdf', 'doc', 'docx', 'xls', 'xlsx'] })

      if (imagenFile && imagenFile.tmpPath) {
        const upload = await cloudinary.uploader.upload(imagenFile.tmpPath, { folder: 'reportes', resource_type: 'auto' })
        datos.imagen = upload.secure_url
      }

      if (archivoFile && archivoFile.tmpPath) {
        const upload = await cloudinary.uploader.upload(archivoFile.tmpPath, { folder: 'reportes', resource_type: 'auto' })
        datos.archivos = upload.secure_url
      }

      const reporteActualizado = await reporteService.actualizar(params.id, usuario.idEmpresa, datos)
      return response.json({ mensaje: 'Reporte actualizado', datos: reporteActualizado })
    } catch (error: any) {
      console.error('❌ Error en actualizarReporte:', error)
      return response.status(500).json({ error: error.message, messages })
    }
  }

  // Eliminar un reporte
  public async eliminarReporte({ params, request, response }: HttpContext) {
    try {
      const usuario = (request as any).usuario
      if (!usuario) return response.unauthorized({ error: 'Usuario no autenticado' })

      await reporteService.eliminar(params.id, usuario.idEmpresa)
      return response.json({ mensaje: 'Reporte eliminado' })
    } catch (error: any) {
      return response.status(500).json({ error: error.message })
    }
  }
}

export default ReportesController
