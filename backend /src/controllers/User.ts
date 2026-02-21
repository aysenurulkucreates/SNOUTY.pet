import dotenv from "dotenv";
dotenv.config();
import type { Request, Response } from "express";
import User from "../models/User";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user.userId || req.user.id;
    if (!id) {
      return res.status(400).json({ msg: "User ID is missing in token!" });
    }
    const result = await User.findById(id).select("-password");
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ result });
  } catch (error) {
    console.log("Criticial failing:", error);
    // catch bloğunda hata fırlatmamak için burayı da kapatıyoruz
    if (!res.headersSent) {
      return res
        .status(500)
        .json({ msg: "Unexpected failed, please try again later." });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ msg: "A user with this email could not be found" });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(401).json({ msg: "Passwords do not match" });
    }

    const token = JWT.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.SECRET_KEY!,
      { expiresIn: "3d" },
    );

    return res
      .status(200)
      .json({ token, userId: user._id, email, isAdmin: user.isAdmin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Failed login" });
  }
};

export const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  try {
    const currentUser = await User.findOne({ email });
    if (currentUser) {
      return res.status(400).json({ msg: "This email already in use" });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: "User registered!", userId: newUser._id });
  } catch (error) {
    res.status(500).json({ msg: "Failed register" });
  }
};

export const getSitters = async (req: Request, res: Response) => {
  try {
    const sitters = await User.find({ isCaregiving: true })
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({ sitters });
  } catch (error) {
    console.log(error, "System failed");
    res
      .status(500)
      .json({ msg: "Some unexpected error occured.Please try again later." });
  }
};

export const getSitter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ msg: "User ID is missing in URL!" });
    }
    const sitter = await User.findOne({ _id: id, isCaregiving: true }).select(
      "-password",
    );

    return res.status(200).json({ sitter });
  } catch (error) {
    console.log(error, "System failed.");
    res
      .status(500)
      .json({ msg: "Some unexpected error occured.Please try again later." });
  }
};

export const updateCaregivingProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.userId;

    const {
      expectedFee,
      experience,
      homeEnvironment,
      username,
      profilePicture,
      location,
      bio,
    } = req.body;

    const result = await User.findByIdAndUpdate(
      userId,
      {
        expectedFee,
        experience,
        homeEnvironment,
        isCaregiving: true,
        username,
        profilePicture,
        location,
        bio,
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );

    if (!result) {
      return res.status(404).json({ msg: "User not found!" });
    }

    return res.status(200).json({ result });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ msg: "Unexpected error occured. Please try again later." });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const { password, ...updatedData } = req.body;
    const result = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      return res.status(404).json({ msg: "User not found!" });
    }
    res.status(200).json({ result });
  } catch (error) {
    return res.status(500).json({ msg: "Failed updating" });
  }
};

export const deleteAccount = async (req: Request, res: Response) => {
  try {
    const id = req.user.id;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ msg: "This does not exist." });
    }

    res.status(200).json({ msg: "Successfull deleting." });
  } catch (error) {
    res.status(500).json({ msg: "Failed deleting" });
  }
};
