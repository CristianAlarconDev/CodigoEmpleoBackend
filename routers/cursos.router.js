import express from 'express';

import coursesController from '../controllers/cursos.controller.js'

const router = express.Router();

//router.get('/', coursesController.getAllCourses);
router.get('/:id', coursesController.getCourseById);
router.post('/', coursesController.getCourseById);
router.put('/:id', coursesController.updateCourse)
router.delete('/:id', coursesController.deleteCourseById);
//reemplaza al get all
router.get('/', coursesController.getCoursesByFilters);

export default router;