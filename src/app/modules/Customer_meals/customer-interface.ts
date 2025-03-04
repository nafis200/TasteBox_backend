
import { ObjectId } from 'mongoose';
export interface ICustomer {
    id?: string;
    name: string;
    cuisine: string;
    dietary_preferences: string[];
    ingredient: string[];
    portion_size: "small" | "medium" | "high";
    image?:string;
    author: ObjectId;
    response:string,       
}
  