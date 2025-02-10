
import express from 'express';
import auth from '../../middleware/auth';
import { ProjectController } from './project.controller';
import ValidateRequest from '../../middleware/ValidateRequest';
import { ProjectValidationSchema } from './project.validation';


const router = express.Router();

router.post('/',ValidateRequest(ProjectValidationSchema),auth("admin"),ProjectController.createProject);

router.get('/',ProjectController.getAllProject)


router.put('/:projectId',auth("admin"), ProjectController.UpdateSingleProject)

router.delete('/:projectId',auth("admin"), ProjectController.DeleteProject)

export const ProjectRoutes = router