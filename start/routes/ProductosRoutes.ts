import ProductosController from "../../app/controller/ProductosController.js";
import Route from "@adonisjs/core/services/router";
import AuthJwtMiddleware from "#middleware/auth_jwt";


const authJwt= new AuthJwtMiddleware()

const productosController = new ProductosController();
// Rutas para productos

Route.post('/crearProducto', productosController.crear).use(authJwt.handle.bind(authJwt))
Route.get('/listarProductos', productosController.listar).use(authJwt.handle.bind(authJwt))
Route.get('/productos/cargo/::nombreCargo', productosController.listarPorCargo)
Route.put('/actualizarProducto/:id', productosController.actualizar)
Route.delete('/eliminarProducto/:id', productosController.eliminar)