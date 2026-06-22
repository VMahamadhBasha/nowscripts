import { Schema, model, InferSchemaType } from "mongoose";

const bookmarkSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  moduleId: {
    type: Schema.Types.ObjectId,
    ref: "modules",
    required: true,
  }
}, { timestamps: true });

// Ensure unique bookmark per user-module
bookmarkSchema.index({ userId: 1, moduleId: 1 }, { unique: true });

type bookmarkSchemaInferType = InferSchemaType<typeof bookmarkSchema>;
export default model<bookmarkSchemaInferType>("bookmarks", bookmarkSchema);
