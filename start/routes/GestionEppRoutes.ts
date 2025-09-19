import Route from '@adonisjs/core/services/router'
import GestionEppController from '../../app/controller/GestionEppController.js'
import AuthJwt from "../../app/middleware/auth_jwt.js"

const gestionEppController = new GestionEppController()

const authJwt= new AuthJwt()

Route.post('/crearGestionEpp', gestionEppController.crear).use(authJwt.handle.bind(authJwt))
Route.get('/listarGestiones', gestionEppController.listar).use(authJwt.handle.bind(authJwt))