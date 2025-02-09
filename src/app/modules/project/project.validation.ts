import { z } from "zod";

export const ProjectValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: "Title is required" })
      .min(3, { message: "Title must be at least 3 characters long" }),
     description: z
    .array(z.string().min(10, { message: "Each description must be at least 10 characters long" }))
    .nonempty({ message: "Description is required" }),
    image: z.string().url({ message: "Invalid image URL" }).optional(),
    github_link: z.string().url({ message: "Invalid GitHub link" }).optional(),
    project_link: z.string().url({ message: "Invalid project link" }).optional(),
  }),
});
