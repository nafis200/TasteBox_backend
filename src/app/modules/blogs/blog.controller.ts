import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";

import httpStatus from 'http-status';
import { BlogServices } from "./blog.services";


const createBlogs = catchAsync(async (req, res) => {
    const Projectdata = req.body;
    const result = await BlogServices.createBlogsIntoDB(Projectdata);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog created successfully',
      data: result,
    });
  });

  const getAllBlogs = catchAsync(async (req, res) => {
 
    const result = await BlogServices.getAllBlogsIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs are retrieved successfully',
      data:result
    });
  });

  const DeleteBlogs = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const result = await BlogServices.deleteBlogsFromDB(projectId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blogs is deleted successfully',
      data: result,
    });
  });


  const UpdateSingleBlogs = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const ProjectData = req.body;
    const result = await BlogServices.UpdateBlogsFromDB(projectId, ProjectData);
  
  
    if (result !== null) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs updated successfully',
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
  

export const BlogController = {
    createBlogs,
    getAllBlogs,
    DeleteBlogs,
    UpdateSingleBlogs
}
