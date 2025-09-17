import UsuarioService from '#services/UsuarioService'
import type { HttpContext } from '@adonisjs/core/http'

const usuarioService = new UsuarioService()

export default class UsuarioController {
  private service = new UsuarioService()

  // Registro de usuario
  async register({ request, response }: HttpContext) {
    const {
      id_empresa,
      id_area,
      nombre,
      apellido,
      nombre_usuario,
      correo_electronico,
      cargo,
      contrasena,
      confirmacion
    } = request.only([
      'id_empresa',
      'id_area',
      'nombre',
      'apellido',
      'nombre_usuario',
      'correo_electronico',
      'cargo',
      'contrasena',
      'confirmacion'
    ])

    const resultado = await usuarioService.register(
      id_empresa,
      id_area,
      nombre,
      apellido,
      nombre_usuario,
      correo_electronico,
      cargo,
      contrasena,
      confirmacion
    )

    return response.status(201).json(resultado)
  }

  // Login de usuario
 async login({ request, response }: HttpContext) {
  try {
    const { correo_electronico, contrasena } = request.only([
      'correo_electronico',
      'contrasena'
    ])

    const resultado = await usuarioService.login(correo_electronico, contrasena)

    if (!resultado.ok) {
      return response.status(401).json({ msj: resultado.msj })
    }

    return response.json(resultado)
  } catch (error) {
    console.error(error)
    return response.status(500).json({ mensaje: 'Error interno', error: error.message })
  }
}


  // Obtener usuario logueado (ruta protegida)
  async usuarioLogueado({ request, response }: HttpContext) {
    try {
      const user = (request as any).user
      if (!user) {
        return response.status(401).json({ error: 'Usuario no autenticado' })
      }
      return response.json({ user })
    } catch (error) {
      return response.status(500).json({ error: error.message })
    }
  }

  // Listar usuarios de la misma empresa
  async listarUsuarios({ request }: HttpContext) {
    try {
      const empresaId = (request as any).user.idEmpresa
      return this.service.listar(empresaId)
    } catch (error) {
      return { error: error.message }
    }
  }

  // Listar usuario por ID
  async listarUsuarioId({ params, request }: HttpContext) {
    try {
      const empresaId = (request as any).user.idEmpresa
      const usuario = await usuarioService.listarId(params.id, empresaId)
      return usuario
    } catch (error) {
      return { error: error.message }
    }
  }

  // Actualizar usuario
  async actualizarUsuario({ params, request }: HttpContext) {
    try {
      const datos = request.all()
      const empresaId = (request as any).user.idEmpresa
      const usuario = await usuarioService.actualizar(params.id, datos, empresaId)
      return usuario
    } catch (error) {
      return { error: error.message }
    }
  }

  // Eliminar usuario
  async eliminarUsuario({ params, request }: HttpContext) {
    try {
      const empresaId = (request as any).user.idEmpresa
      const resultado = await usuarioService.eliminar(params.id, empresaId)
      return resultado
    } catch (error) {
      return { error: error.message }
    }
  }

  // Conteo total de usuarios
  async conteoUsuarios() {
    const conteo = await usuarioService.conteo()
    return conteo
  }
}
