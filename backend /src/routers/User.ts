import { Router } from "express";
import {
  register,
  login,
  updateProfile,
  deleteAccount,
  getUserProfile,
  updateCaregivingProfile,
  getSitters,
  getSitter,
} from "../controllers/User";
import { verifyToken } from "../middleware/VerifyToken";

const router = Router();

router.get("/profile", verifyToken, getUserProfile);

router.post("/login", login);

router.post("/register", register);

router.get("/caregiving", getSitters);

router.get("/caregiving/:id", getSitter);

router.patch("/caregiving", verifyToken, updateCaregivingProfile);

router.patch("/:id", verifyToken, updateProfile);

router.delete("/:id", verifyToken, deleteAccount);

export default router;
