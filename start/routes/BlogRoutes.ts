import Route from "@adonisjs/core/services/router"
import PublicacionBlogController from "../../app/controller/PublicacionBlogController.js"
import AuthJwtMiddleware from "#middleware/auth_jwt"

const authJwt= new AuthJwtMiddleware()
const blog = new PublicacionBlogController()

Route.post('/crearBlog', blog.crear).use(authJwt.handle.bind(authJwt))
Route.get('/listarBlog', blog.listarTodos).use(authJwt.handle.bind(authJwt))
Route.get('/listarBlogPorEmpresa', blog.listarPorEmpresa).use(authJwt.handle.bind(authJwt))
Route.get('/listarBlogPorUsuario', blog.listarPorUsuario).use(authJwt.handle.bind(authJwt))
Route.put('/actualizarBlog/:id', blog.actualizar).use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarBlog/:id', blog.eliminar).use(authJwt.handle.bind(authJwt))