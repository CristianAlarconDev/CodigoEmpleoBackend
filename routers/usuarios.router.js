import express from 'express';
import userController from '../controllers/usuarios.controller.js';

const router = express.Router();

// METODOS BASICOS PARA UN USUARIO
router.post('/', userController.registerUser);          
router.get('/:uid', userController.getUserProfile);     
router.put('/:uid', userController.updateUser);         

// ACCIONES (Favoritos y Postulaciones)
// LOS POST PARA LAS ACCIONES QUE VA A EDITAR LOS ARRAY EN LAS COLECCIONES
router.put('/:uid/favoritos/curso', userController.toggleCourseFav);
router.put('/:uid/favoritos/empleo', userController.toggleJobFav);
router.post('/:uid/postular', userController.postulateToJob);

export default router;