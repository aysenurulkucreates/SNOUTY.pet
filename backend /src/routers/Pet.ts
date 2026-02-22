import { Router } from "express";
import {
  createPet,
  getAllPets,
  getPet,
  deletePet,
  updatePet,
  getMyPets,
} from "../controllers/Pet";
import { verifyToken } from "../middleware/VerifyToken";

const router = Router();

router.get("/", getAllPets);

router.get("/my-pets", verifyToken, getMyPets);

router.post("/", verifyToken, createPet);

router.get("/:id", getPet);

router.delete("/:id", verifyToken, deletePet);

router.patch("/:id", verifyToken, updatePet);

export default router;
