import { Router } from "express";
import {
  createPet,
  getAllPets,
  getPet,
  deletePet,
  updatePet,
} from "../controllers/Pet";
import { verifyToken } from "../middleware/VerifyToken";

const router = Router();

router.get("/", getAllPets);

router.get("/:id", getPet);

router.post("/", verifyToken, createPet);

router.delete("/:id", verifyToken, deletePet);

router.patch("/:id", verifyToken, updatePet);

export default router;
