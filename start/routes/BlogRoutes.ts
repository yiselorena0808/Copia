import Route from "@adonisjs/core/services/router"
import PublicacionBlogController from "../../app/controller/PublicacionBlogController.js"
import AuthJwtMiddleware from "#middleware/auth_jwt"

const authJwt = new AuthJwtMiddleware()
const blog = new PublicacionBlogController()

// Crear blog
Route.post('/blogs', blog.crear).use(authJwt.handle.bind(authJwt))

// Listar blogs por empresa
Route.get('/blogs/empresa/:id_empresa', blog.listarPorEmpresa).use(authJwt.handle.bind(authJwt))

// Actualizar blog por ID
Route.put('/blogs/:id', blog.actualizar).use(authJwt.handle.bind(authJwt))

// Eliminar blog por ID
Route.delete('/blogs/:id', blog.eliminar).use(authJwt.handle.bind(authJwt))
