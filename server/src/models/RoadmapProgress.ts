import { Schema, model, InferSchemaType } from "mongoose";

const roadmapProgressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    roadmapId: { type: Schema.Types.ObjectId, ref: "roadmaps", required: true },
    completedModules: [{ type: Schema.Types.ObjectId, ref: "roadmapModules" }],
    progressPercentage: { type: Number, default: 0 },
    lastVisited: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

type roadmapProgressSchemaInferType = InferSchemaType<typeof roadmapProgressSchema>;
export default model<roadmapProgressSchemaInferType>("roadmapProgresses", roadmapProgressSchema);
