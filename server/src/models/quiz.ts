import { Schema, model, InferSchemaType } from "mongoose";

const quizSchema = new Schema({
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "modules",
    required: true,
  },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOptionIndex: { type: Number, required: true },
    explanation: String
  }]
}, { timestamps: true });

type quizSchemaInferType = InferSchemaType<typeof quizSchema>;
export default model<quizSchemaInferType>("quizzes", quizSchema);
