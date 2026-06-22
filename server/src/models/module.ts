import { Schema, model, InferSchemaType } from "mongoose";

const moduleSchema = new Schema({
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  learningObjectives: [{ type: String }],
  description: String,
  estimatedTime: String,
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
  },
  order: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

type moduleSchemaInferType = InferSchemaType<typeof moduleSchema>;
export default model<moduleSchemaInferType>("modules", moduleSchema);
