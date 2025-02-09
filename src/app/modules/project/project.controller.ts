import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { ProjectServices } from "./project.services";
import httpStatus from 'http-status';


const createProject = catchAsync(async (req, res) => {
    const Projectdata = req.body;
    const result = await ProjectServices.createProjectIntoDB(Projectdata);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project created successfully',
      data: result,
    });
  });

  const getAllProject = catchAsync(async (req, res) => {
 
    const result = await ProjectServices.getAllProjectIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Project are retrieved successfully',
      data:result
    });
  });

  const DeleteProject = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const result = await ProjectServices.deleteProjectFromDB(projectId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'CarData is deleted successfully',
      data: result,
    });
  });


  const UpdateSingleProject = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const ProjectData = req.body;
    const result = await ProjectServices.UpdateCarFromDB(projectId, ProjectData);
  
  
    if (result !== null) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Project updated successfully',
        data: result,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Id not found',
        data: result,
      });
    }
  });
  

export const ProjectController = {
    createProject,
    getAllProject,
    DeleteProject,
    UpdateSingleProject
}
