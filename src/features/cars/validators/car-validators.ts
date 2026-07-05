import { createCarSchema, updateCarSchema, carListQuerySchema, carDetailSchema } from "../schemas/car-schemas";

export const validateCreateCar = (input: unknown) => createCarSchema.parse(input);
export const validateUpdateCar = (input: unknown) => updateCarSchema.parse(input);
export const validateCarListQuery = (input: unknown) => carListQuerySchema.parse(input);
export const validateCarDetail = (input: unknown) => carDetailSchema.parse(input);

