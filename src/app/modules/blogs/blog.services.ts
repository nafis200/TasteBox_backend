
import { ObjectId } from 'mongodb';
import { Blogs } from './blogs.model';
import type { TBlogs } from './blogs.interface';

const createBlogsIntoDB = async (payload: TBlogs) => {
  const result = await Blogs.create(payload);
  return result;
};

const getAllBlogsIntoDB = async () => {
  const result = await Blogs.find();
  return result;
};

const deleteBlogsFromDB = async (carId: string) => {
  const result = await Blogs.updateOne(
    { _id: new ObjectId(carId) },
    {
      isDeleted: true,
    },
  );
  return result;
};

const UpdateBlogsFromDB = async (
  projectId: string,
  ProjectData: Partial<TBlogs>,
) => {



  const result = await Blogs.findByIdAndUpdate(
    projectId,
    {
      $set: {
        ...ProjectData,
      },
    },
    {
      new: true,
      runValidators: true,
    },
  );
  return result
};

export const BlogServices = {
  createBlogsIntoDB,
  getAllBlogsIntoDB,
  deleteBlogsFromDB,
  UpdateBlogsFromDB
};
