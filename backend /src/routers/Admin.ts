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
} from "../controllers/Admin";
import { verifyAdmin } from "../middleware/VerifyToken";

const router = Router();

//USERS
router.get("/users", verifyAdmin, getAllUsers);
router.get("/users/:id", verifyAdmin, getUser);
router.patch("/users/:id", verifyAdmin, updateUser);
router.delete("/users/:id", verifyAdmin, deleteUser);

//PETS
router.get("/pets", verifyAdmin, getAllPets);
router.get("/pets/:id", verifyAdmin, getPet);
router.patch("/pets/:id", verifyAdmin, updatePet);
router.delete("/pets/:id", verifyAdmin, deletePet);

//ADMİN STATS
router.get("/admin/stats", verifyAdmin, getAdminStats);

export default router;
