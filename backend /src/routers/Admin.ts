import { Router } from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllPets,
  getPet,
  updatePet,
  deletePet,
  getAdminStats,
  getRecentActivities,
} from "../controllers/Admin";
import { verifyAdmin, verifyToken } from "../middleware/VerifyToken";

const router = Router();

//USERS
router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.get("/users/:id", verifyToken, verifyAdmin, getUser);
router.patch("/users/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);

//PETS
router.get("/pets", verifyToken, verifyAdmin, getAllPets);
router.get("/pets/:id", verifyToken, verifyAdmin, getPet);
router.patch("/pets/:id", verifyToken, verifyAdmin, updatePet);
router.delete("/pets/:id", verifyToken, verifyAdmin, deletePet);

//ADMİN STATS
router.get("/stats", verifyToken, verifyAdmin, getAdminStats);
router.get("/recent-activities", verifyToken, verifyAdmin, getRecentActivities);

export default router;
