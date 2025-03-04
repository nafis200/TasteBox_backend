import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/Apperror";
import type { ICustomer } from "./customer-interface";
import customerModel from "./customer-model";


const createCustomerMeal = async(payload:ICustomer)=>{
     if(!payload){
        throw new Error("Meal is undefined or null")
     }
     const Meals = await customerModel.create(payload);
     return Meals
}



const getAllCustomerMeal = async (query: Record<string, unknown>) => {
    
    const courseQuery = new QueryBuilder(customerModel.find(), query)
      .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await courseQuery.modelQuery.populate("author");
    const meta = await courseQuery.countTotal()
    return {
        meta,
        result
    };
  };

  const UpdateCustomerMeal = async (
    projectId: string,
    ProjectData: Partial<ICustomer>,
  ) => {
  
    const {ingredient,...remainingData} = ProjectData
    
    if (ProjectData.ingredient) {
      await customerModel.findByIdAndUpdate(
        projectId,
        {
          $addToSet: { technologies: { $each: ingredient } },
        },
        {
          new: true,
          runValidators: true,
        },
      );
    }
  
    const result = await customerModel.findByIdAndUpdate(
      projectId,
      {
        $set: {
          ...remainingData,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    return result
  };

  
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const UpdateResponse = async (id: string, payload: any) => {
  const ExistingId = await customerModel.findById(id);

  if (!ExistingId) {
    throw new AppError(404, "Id is invalid");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let updatedUser:any;

  const orderResponse = (payload.order || "").toLowerCase();

  if (orderResponse === "accept") {
    updatedUser = await customerModel.findByIdAndUpdate(
      id,
      { response: "Accept" },
      { new: true }
    );
  } else if (orderResponse === "decline") {
    updatedUser = await customerModel.findByIdAndUpdate(
      id,
      { response: "Decline" },
      { new: true }
    );
  } else if (orderResponse === "pending") {
    updatedUser = await customerModel.findByIdAndUpdate(
      id,
      { response: "Pending" },
      { new: true }
    );
  } else {
    throw new AppError(404, "Invalid order status provided");
  }

  return updatedUser;
};


export const CustomerMealServices = {
    createCustomerMeal,
    getAllCustomerMeal,
    UpdateCustomerMeal,
    UpdateResponse
}