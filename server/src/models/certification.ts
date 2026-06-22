import { Schema, model, InferSchemaType } from "mongoose";

const certificationSchema = new Schema({
  title: { type: String, required: true },
  provider: String,
  description: String,
  examCode: String,
  relatedRoadmap: { type: Schema.Types.ObjectId, ref: "roadmaps" },
}, { timestamps: true });

type certificationSchemaInferType = InferSchemaType<typeof certificationSchema>;
export default model<certificationSchemaInferType>("certifications", certificationSchema);
