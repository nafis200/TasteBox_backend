import type { TEmail } from "./message.interface";
import { Email } from "./message.model";

const createMessageIntoDB = async (payload: TEmail) => {
  const result = await Email.create(payload);
  return result;
};

const getAllMessageIntoDB = async () => {
  const result = await Email.find();
  return result;
};

export const MessageServices = {
    createMessageIntoDB,
    getAllMessageIntoDB
}