import { model, Schema } from "mongoose";
import type { TBlogs } from "./blogs.interface";


const BlogSchema = new Schema<TBlogs>(
    {
      image: { type: String, required: false },
      title: { type: String, required: true },
      description: { type: String, required: true },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  BlogSchema.pre('find',function(next){
    this.find({ isDeleted: { $ne: true } });
    next();
  })

  BlogSchema.pre('findOne',function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  })

  BlogSchema.pre('aggregate',function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  })

export const Blogs = model<TBlogs>('Blogs', BlogSchema);