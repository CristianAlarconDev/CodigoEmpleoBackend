import express from 'express';

import jobsController from '../controllers/empleos.controller.js'

const router = express.Router();

router.get('/', jobsController.getAllJobs);
router.get('/:id', jobsController.getJobById);
router.post('/', jobsController.createJob);
router.put('/:id', jobsController.updateJob)
router.delete('/:id', jobsController.deleteJobById);

export default router;