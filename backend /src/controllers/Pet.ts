import type { Request, Response } from "express";
import Pet from "../models/Pet";

export const getAllPets = async (req: any, res: Response) => {
  try {
    // Hiçbir userId kontrolü yapmadan direkt tüm koleksiyonu buluyoruz
    const pets = await Pet.find({}); // Boş süslü parantez 'her şeyi getir'

    return res.status(200).json({ pets });
  } catch (error: any) {
    return res.status(500).json({
      msg: "Unexpected error occured.Please try again later.",
      error: error.message,
    });
  }
};

export const getPet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ pet });
    }
    res.status(200).json({ msg: "Successful getting pet.", pet });
  } catch (error) {
    return res
      .status(500)
      .json({ msg: "Unexpected error. Please try again later." });
  }
};

export const getMyPets = async (req: Request, res: Response) => {
  // 🩺 Adım 1: Fonksiyonun tetiklendiğini teyit ediyoruz
  console.log("🚑 getMyPets: Operation started...");

  try {
    const user = (req as any).user;
    console.log("🩺 Patient Identity (Token Data):", user);

    if (!user || !user.userId) {
      console.error("🚨 Diagnostic Failure: User ID missing in request!");
      return res.status(401).json({ msg: "User identity missing in token!" });
    }

    const ownerId = user.userId;
    console.log("🔍 Searching for pets owned by:", ownerId);

    // 🩺 Adım 2: Veritabanı sorgusu
    const myPets = await Pet.find({ userId: ownerId });

    console.log(`✅ Success: Found ${myPets.length} pets for user ${ownerId}`);

    // JSON olarak patileri pırlanta gibi döndürüyoruz
    return res.status(200).json(myPets);
  } catch (error: any) {
    // 🚨 KRİTİK: Gerçek hatayı hem terminale hem de frontend'e fırlatıyoruz
    console.error("🔥 SYSTEM COLLAPSE (Internal Error):", error.message);

    return res.status(500).json({
      msg: "Unexpected error occured. Please check server logs.",
      diagnostic: error.message, // 💉 Bu satır hatayı Network sekmesine taşır
    });
  }
};

export const createPet = async (req: Request, res: Response) => {
  try {
    const ownerId = (req as any).user.userId;
    const petData = {
      ...req.body,
      userId: ownerId,
    };

    const newPet = new Pet(petData);
    const savedPet = await newPet.save();

    res.status(201).json(savedPet);
  } catch (error) {
    console.log("Creation Error:", error);
    res.status(500).json({ msg: "Failed operation." });
  }
};

export const deletePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found!" });
    }

    const requesterId = (req as any).user.userId;

    if (pet.userId.toString() !== requesterId) {
      return res
        .status(403)
        .json({ msg: "Unauthorized: You can only delete your own besties." });
    }
    await Pet.findByIdAndDelete(id);
    res.status(200).json({ msg: "Deleting is successful" });
  } catch (error) {
    res.status(500).json({ msg: "Failed deleting" });
  }
};

export const updatePet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPet = req.body;
    const pet = await Pet.findById(id);
    const requesterId = (req as any).user.userId;

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found!" });
    }

    if (pet.userId.toString() !== requesterId) {
      return res.status(403).json({ msg: "You can only delete your own pet." });
    }
    const result = await Pet.findByIdAndUpdate(id, updatedPet, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ msg: "Failed updating" });
  }
};
