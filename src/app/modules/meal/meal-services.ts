import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./meal-constant";
import type { IMeal } from "./meal-interface";
import mealModel from "./meal-model";
import { ObjectId } from 'mongodb';

const createMeal = async(payload:IMeal)=>{
     if(!payload){
        throw new Error("Meal is undefined or null")
     }
     const Meals = await mealModel.create(payload);
     return Meals
}

const getAllMeal = async (query: Record<string, unknown>) => {
    
    const courseQuery = new QueryBuilder(mealModel.find(), query)
      .search(searchableFields)
      // .filter()
      .sort()
      .paginate()
      .fields();
  
    const result = await courseQuery.modelQuery;
    const meta = await courseQuery.countTotal()
    return {
        meta,
        result
    };
  };

  const SingleMeal = async(carId:string)=>{
  
    
    const result = await mealModel.aggregate([
       {
        $match: { _id: new ObjectId(carId) }
       }
    ])  
    return result
}

  
  


  const UpdateMeal = async (
    projectId: string,
    ProjectData: Partial<IMeal>,
  ) => {
  
    const {ingredient,...remainingData} = ProjectData
    
    if (ProjectData.ingredient) {
      await mealModel.findByIdAndUpdate(
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
  
    const result = await mealModel.findByIdAndUpdate(
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


export const MealServices = {
    createMeal,
    getAllMeal,
    UpdateMeal,
    SingleMeal
}