import bcrypt from 'bcryptjs'
import Usuario from '#models/usuario'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || 'sstrict'

class UsuarioService {
  // Registro de usuario
   async register(
    id_empresa: number,
    id_area: number,
    nombre: string,
    apellido: string,
    nombre_usuario: string,
    correo_electronico: string,
    cargo: string,
    contrasena: string,
    confirmacion: string
  ) {
    if (contrasena !== confirmacion) return { mensaje: 'Las contraseñas no coinciden', ok: false }

    const existingUser = await Usuario.query().where('correo_electronico', correo_electronico).first()
    if (existingUser) return { mensaje: 'El correo ya está registrado', ok: false }

    const hash = await bcrypt.hash(contrasena, 10)

    const user = await Usuario.create({
      id_empresa, id_area, nombre, apellido,
      nombre_usuario, correo_electronico, cargo,
      contrasena: hash
    })

    const usuarioCompleto = await Usuario.query().where('id', user.id).preload('empresa').preload('area').first()

    return { mensaje: 'Registro correcto', ok: true, user: usuarioCompleto }
  }

  // Login
  async login(correo_electronico: string, contrasena: string) {
    if (!correo_electronico || !contrasena)
      return { ok: false, msj: 'Correo y contraseña son obligatorios' }

    const usuario = await Usuario.query().where('correo_electronico', correo_electronico).preload('empresa').preload('area').first()
    if (!usuario) return { ok: false, msj: 'Correo o contraseña incorrectos' }

    const isValid = await bcrypt.compare(contrasena, usuario.contrasena)
    if (!isValid) return { ok: false, msj: 'Correo o contraseña incorrectos' }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: `${usuario.nombre} ${usuario.apellido}`, // nombre completo
        idEmpresa: usuario.id_empresa,
        correoElectronico: usuario.correo_electronico
      },
      SECRET,
      { expiresIn: '8h' }
    )

    return {
      ok: true,
      mensaje: 'Login correcto',
      token,
      user: {
        id: usuario.id,
        nombre: `${usuario.nombre} ${usuario.apellido}`,
        correoElectronico: usuario.correo_electronico,
        idEmpresa: usuario.id_empresa,
        empresa: usuario.empresa,
        area: usuario.area
      }
    }
  }
  
  // Listar todos los usuarios de una empresa
  async listar(empresaId: number) {
    return Usuario.query()
      .where('id_empresa', empresaId)
      .preload('empresa')
      .preload('area')
  }

  // Listar usuario por ID y empresa
  async listarId(id: number, empresaId: number) {
    return Usuario.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .preload('empresa')
      .preload('area')
      .first()
  }

  // Actualizar usuario
  async actualizar(id: number, datos: Partial<Usuario>, empresaId: number) {
    const usuario = await Usuario.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .first()
    if (!usuario) return { error: 'Usuario no encontrado o autorizado' }

    usuario.merge(datos)
    await usuario.save()
    return usuario
  }

  // Eliminar usuario
  async eliminar(id: number, empresaId: number) {
    const usuario = await Usuario.query()
      .where('id', id)
      .andWhere('id_empresa', empresaId)
      .first()
    if (!usuario) return { mensaje: 'Usuario no encontrado o autorizado' }

    await usuario.delete()
    return { mensaje: 'Usuario eliminado correctamente' }
  }

  // Conteo total de usuarios
  async conteo() {
    const usuarios = await Usuario.query()
    return { total: usuarios.length, usuarios }
  }
}

export default UsuarioService
