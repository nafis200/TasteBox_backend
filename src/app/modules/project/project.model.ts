import { model, Schema } from "mongoose";
import  { TProject } from "./project.interface";


const ProjectSchema = new Schema<TProject>(
    {
      image: { type: String, required: false },
      title: { type: String, required: true },
      description: { type: [String], required: true },
      github_link: { type: String, required: false },
      project_link: { type: String, required: false },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      technologies:{
        type:[String]
      }
    },
    { timestamps: true }
  );

  ProjectSchema.pre('find',function(next){
    this.find({ isDeleted: { $ne: true } });
    next();
  })

  ProjectSchema.pre('findOne',function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
  })

  ProjectSchema.pre('aggregate',function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
    next();
  })


export const Project = model<TProject>('Project', ProjectSchema);