import { Schema, model, InferSchemaType } from "mongoose";

const projectSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  tasks: [{ type: String }],
  solutionUrl: String,
}, { timestamps: true });

type projectSchemaInferType = InferSchemaType<typeof projectSchema>;
export default model<projectSchemaInferType>("projects", projectSchema);
