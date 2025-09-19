import ProductosController from "../../app/controller/ProductosController.js";
import Route from "@adonisjs/core/services/router";
import AuthJwt from "../../app/middleware/auth_jwt.js";


const authJwt= new AuthJwt()

const productosController = new ProductosController();
// Rutas para productos

Route.post('/crearProducto', productosController.crear).use(authJwt.handle.bind(authJwt))
Route.get('/listarProductos', productosController.listar).use(authJwt.handle.bind(authJwt))
Route.get('/productos/cargo/::nombreCargo', productosController.listarPorCargo)
Route.put('/actualizarProducto/:id', productosController.actualizar)
Route.delete('/eliminarProducto/:id', productosController.eliminar)