import { model, Schema } from "mongoose";
import type { TEmail } from "./message.interface";


const EmailSchema = new Schema<TEmail>(
  {
    email: { type: String, required: false },
    subject: { type: String, required: false },
    description: { type: String, required: false },
  },
  { timestamps: true } 
);

export const Email = model<TEmail>("Email", EmailSchema);
