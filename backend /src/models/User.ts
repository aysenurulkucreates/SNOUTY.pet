import mongoose, { Schema, Document } from "mongoose";

export interface Iuser extends Document {
  username: string;
  email: string;
  password: string;
  isCaregiving: boolean;
  isAdmin: boolean;
  expectedFee?: number;
  location?: string;
  bio: string;
  experience?: number;
  homeEnvironment?: string;
  profilePicture?: string;
}

const UserSchema: Schema = new Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    isCaregiving: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    expectedFee: { type: Number, default: 0 },
    location: { type: String, default: 0 },
    bio: { type: String, required: true },
    experience: { type: String, default: "" },
    homeEnvironment: {
      type: String,
      enum: ["Apartment", "House with Garden", "Farm", "Studio"],
      default: "Apartment",
    },
    profilePicture: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?q=80&w=1180&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  { timestamps: true },
);

export default mongoose.model<Iuser>("User", UserSchema);
