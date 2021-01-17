import express from 'express'
const router = express.Router();
import { deleteProject, getProjectById, getProjects, createProject, updateProject, createProjectTask, getTopProjects } from '../controllers/projectController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProjects).post(protect, admin, createProject)
// router.get('/top', getTopProjects)
router.route('/:id/tasks').post(protect, createProjectTask)
router.route('/:id').get(getProjectById).delete(protect, admin, deleteProject).put(protect, admin, updateProject)

export default router