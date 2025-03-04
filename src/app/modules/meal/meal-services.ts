import QueryBuilder from "../../builder/QueryBuilder";
import { searchableFields } from "./meal-constant";
import type { IMeal } from "./meal-interface";
import mealModel from "./meal-model";


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
      .filter()
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
    UpdateMeal
}