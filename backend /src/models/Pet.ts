import mongoose, { Schema, Document } from "mongoose";

export interface Ipet extends Document {
  name: string;
  userId: string;
  type: string;
  age: number;
  imageUrl: string;
  description: string;
}

const PetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true },
    age: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<Ipet>("Pet", PetSchema);
