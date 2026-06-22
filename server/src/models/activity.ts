import { Schema, model } from "mongoose";

interface IActivity {
  userId: Schema.Types.ObjectId;
  userName: string;
  userAvatar: string;
  message: string;
  type: string; // e.g., NEW_POST, NEW_COMMENT, NEW_LIKE
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true },
    userAvatar: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IActivity>("Activity", activitySchema);
