
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendresponse";
import httpStatus from 'http-status';
import { MessageServices } from "./message.services";


const createMessage = catchAsync(async (req, res) => {
    const Projectdata = req.body;
    const result = await MessageServices.createMessageIntoDB(Projectdata);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Meessage created successfully',
      data: result,
    });
  });

  const getAllMessage = catchAsync(async (req, res) => {
 
    const result = await MessageServices.getAllMessageIntoDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Message are retrieved successfully',
      data:result
    });
  });


  export const MessageController = {
     createMessage,
     getAllMessage
}


