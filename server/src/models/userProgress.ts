import { Schema, model, InferSchemaType } from "mongoose";

const userProgressSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  completedModules: [{
    type: Schema.Types.ObjectId,
    ref: "modules",
  }],
  learningStreak: {
    type: Number,
    default: 0,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  learningHours: {
    type: Number,
    default: 0,
  },
  certificatesEarned: [{ type: String }]
}, { timestamps: true });

type userProgressSchemaInferType = InferSchemaType<typeof userProgressSchema>;
export default model<userProgressSchemaInferType>("userprogresses", userProgressSchema);
