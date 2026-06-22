import { Schema, model, InferSchemaType } from "mongoose";

const roadmapModuleSchema = new Schema(
  {
    roadmapId: { type: Schema.Types.ObjectId, ref: "roadmaps", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    estimatedTime: { type: String, required: true },
    resources: [{ type: String }],
    projects: [{ type: String }],
    quiz: { type: Boolean, default: false },
    order: { type: Number, required: true },
  },
  { timestamps: true }
);

type roadmapModuleSchemaInferType = InferSchemaType<typeof roadmapModuleSchema>;
export default model<roadmapModuleSchemaInferType>("roadmapModules", roadmapModuleSchema);
