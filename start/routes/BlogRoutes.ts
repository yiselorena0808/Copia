import Route from "@adonisjs/core/services/router"
import BlogController from "../../app/controller/PublicacionBlogController.js"
import AuthJwt from "../../app/middleware/auth_jwt.js"

const authJwt= new AuthJwt()
const blog = new BlogController()

Route.post('/crearBlog', blog.crear).use(authJwt.handle.bind(authJwt))
Route.get('/listarBlog', blog.listarTodos).use(authJwt.handle.bind(authJwt))
Route.get('/listarBlog/:id', blog.listarPorEmpresa).use(authJwt.handle.bind(authJwt))
Route.put('/actualizarBlog/:id', blog.actualizar).use(authJwt.handle.bind(authJwt))
Route.delete('/eliminarBlog/:id', blog.eliminar).use(authJwt.handle.bind(authJwt))
Route.get('/buscarBlog/:titulo', blog.obtenerPorId).use(authJwt.handle.bind(authJwt))
