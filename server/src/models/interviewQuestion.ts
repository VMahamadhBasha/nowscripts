import { Schema, model, InferSchemaType } from "mongoose";

const interviewQuestionSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: String,
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
}, { timestamps: true });

type interviewQuestionInferType = InferSchemaType<typeof interviewQuestionSchema>;
export default model<interviewQuestionInferType>("interviewquestions", interviewQuestionSchema);
