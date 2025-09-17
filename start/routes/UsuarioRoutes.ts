import Router from "@adonisjs/core/services/router"
import UsuariosController from "../../app/controller/UsuarioController.js"
import AuthJwt from "#middleware/auth_jwt"

const usuario = new UsuariosController()
const authJwt = new AuthJwt()

Router.post('/register',usuario.register)
Router.post('/login', usuario.login)
Router.get('/usuarioLogueado', usuario.usuarioLogueado).middleware([authJwt])