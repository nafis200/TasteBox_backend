import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse"
import httpStatus from "http-status";
import { CustomerMealServices } from "./customer-service";

const createCustomerMeal = catchAsync(async(req,res)=>{
    const Meals = {
        ...req.body
    }

    const result = await CustomerMealServices.createCustomerMeal(Meals)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Meal Created Successfully!",
        data: result,
      });
})

const getAllCustomerMeal = catchAsync(async (req, res) => {
    const result = await CustomerMealServices.getAllCustomerMeal(req?.query);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Meal data Get successfully',
      data: result,
    });
  });

  const UpdateCustomerMeal = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const ProjectData = req.body;
    const result = await CustomerMealServices.UpdateCustomerMeal(projectId, ProjectData);
  
  
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
  const UpdateResponse = catchAsync(async (req, res) => {
    const { projectId } = req.params;
    const ProjectData = req.body;
    const result = await CustomerMealServices.UpdateResponse(projectId,ProjectData);
  
  
    if (result !== null) {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Response updated successfully',
        data: result,
      });
    } else {
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Id is found',
        data: result,
      });
    }
  });

export const CustomerMealController = {
    createCustomerMeal,
    getAllCustomerMeal,
    UpdateCustomerMeal,
    UpdateResponse
}