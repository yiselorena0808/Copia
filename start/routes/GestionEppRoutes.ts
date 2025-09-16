import Route from '@adonisjs/core/services/router'
import GestionEppController from '../../app/controller/GestionEppController.js'
const gestionEppController = new GestionEppController()

Route.post('/crearGestionEpp', gestionEppController.crear)
Route.get('/listarGestiones', gestionEppController.listar)
Route.get('/mostrarGestion/:id', gestionEppController.mostrar)
Route.put('/actualizarGestion/:id', gestionEppController.actualizar)
Route.delete('/eliminarGestion/:id', gestionEppController.eliminar)