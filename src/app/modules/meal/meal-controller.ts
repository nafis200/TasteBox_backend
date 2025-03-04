import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import { MealServices } from './meal-services';
import httpStatus from "http-status";

const createMeal = catchAsync(async(req,res)=>{
    const Meals = {
        ...req.body
    }

    const result = await MealServices.createMeal(Meals)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Meal Created Successfully!",
        data: result,
      });
})

const getAllMeal = catchAsync(async (req, res) => {
    const result = await MealServices.getAllMeal(req?.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Blog data Get successfully',
      data: result,
    });
  });

  const UpdateMeal = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const ProjectData = req.body;
    const result = await MealServices.UpdateMeal(projectId, ProjectData);
  
  
    if (result !== null) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Meal updated successfully',
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

export const MealController = {
    createMeal,
    getAllMeal,
    UpdateMeal
}