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
      // .filter()
      // .sort()
      // .paginate()
      // .fields();
  
    const result = await courseQuery.modelQuery;
    const meta = await courseQuery.countTotal()
    return {
        meta,
        result
    };
  };


export const MealServices = {
    createMeal,
    getAllMeal
}