import { Schema, model, models, Document, Types } from "mongoose";

interface IVoiceSession extends Document {
  _id: Types.ObjectId;
  bookId: Types.ObjectId;
  startedAt: Date;
  endedAt: Date;
  durationSeconds: number;
  createdAt: string;
  updatedAt: string;
}

const VoiceSessionSchema = new Schema<IVoiceSession>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    startedAt: { type: Date, required: true, default: Date.now },
    endedAt: { type: Date },
    durationSeconds: { type: Number, default: 0, required: true },
  },
  { timestamps: true },
);

const VoiceSession =
  models.VoiceSession || model("VoiceSession", VoiceSessionSchema);

export default VoiceSession;
