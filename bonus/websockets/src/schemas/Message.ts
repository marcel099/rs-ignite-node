import mongoose, { Document, Schema } from "mongoose";

type Message = Document & {
  to: string;
  text: string;
  created_at: Date;
  roomId: string;
};

const MessageSchema = new Schema({
  to: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  text: String,
  created_at: {
    type: Date,
    default: Date.now(),
  },
  roomId: {
    type: String,
    ref: "ChatRoom",
  },
});

const Message = mongoose.model<Message>("Message", MessageSchema);

export { Message };
