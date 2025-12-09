import express from 'express';

import coursesController from '../controllers/cursos.controller.js'

const router = express.Router();

router.get('/', coursesController.getAllJobs);
router.get('/:id', coursesController.getJobById);
router.post('/', coursesController.createJob);
router.put('/:id', coursesController.updateJob)
router.delete('/:id', coursesController.deleteJobById);

export default router;