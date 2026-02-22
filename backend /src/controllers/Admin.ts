import { Request, Response } from "express";
import User from "../models/User";
import Pet from "../models/Pet";

// USERS
export const getAllUsers = async (req: any, res: any) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error while fetching users." });
  }
};
export const getUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }
    const result = await User.findById(id).select("-password");
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "System failed." });
  }
};
export const updateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }
    const { password, ...updatedData } = req.body;
    if (req.user.id === id && updatedData.isAdmin === false) {
      return res.status(400).json({
        msg: "You can't take away your own admin privileges.",
      });
    }
    const result = await User.findByIdAndUpdate(id, updatedData, {
      returnDocument: "after",
      runValidators: true,
    });
    if (!result) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "System failed!" });
  }
};
export const deleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "User not found" });
    }
    const result = await User.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).json({ msg: "User not found." });
    }
    await Pet.deleteMany({ ownerId: id });
    res.status(200).json({ msg: "Successfully deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "System failed!" });
  }
};

// PETS
export const getAllPets = async (req: any, res: any) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error while fetching pets." });
  }
};
export const getPet = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "Pet not found" });
    }
    const result = await Pet.findById(id).populate("ownerId", "name email");
    if (!result) {
      return res.status(404).json({ msg: "Pet not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "System failed." });
  }
};
export const updatePet = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "Pet not found" });
    }
    const { name, type, age, description, imageUrl } = req.body;
    const updatedData = { name, type, age, description, imageUrl };
    const result = await Pet.findByIdAndUpdate(id, updatedData, {
      runValidators: true,
      returnDocument: "after",
    });
    if (!result) {
      return res.status(404).json({ msg: "Pet not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "System failed." });
  }
};
export const deletePet = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ msg: "Pet not found" });
    }
    const result = await Pet.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ msg: "Pet not found" });
    }
    await User.findByIdAndUpdate(result.userId, {
      $pull: { pets: id },
    });
    res.status(200).json({ msg: "Successfully deleted." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "System failed." });
  }
};

//ADMİN STATS
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    // 1. ADIM: Sayım Operasyonu (Mermer gibi sağlam veritabanı sorgusu)
    // await kullanarak veritabanından cevap gelmesini sabırla bekliyoruz
    const totalUsers = await User.countDocuments();
    const totalPets = await Pet.countDocuments();

    // 2. ADIM: Paketi Hazırlama
    // Bulduğumuz pırlanta sayıları tek bir objede topluyoruz
    const stats = {
      totalUsers,
      totalPets,
      // İleride buraya 'totalBookings' veya 'revenue' gibi değerler de ekleyebiliriz
    };

    // 3. ADIM: Yanıtı Gönderme
    // Durum kodu 200 (OK) ile verileri JSON formatında React'e uçuruyoruz
    return res.status(200).json(stats);
  } catch (error) {
    // Sahada bir şeyler ters giderse (Server Error) paramedic refleksiyle hatayı yakalıyoruz
    console.error("Stats fetching error:", error);
    return res
      .status(500)
      .json({ msg: "Failed system. Please try again later!" });
  }
};
export const getRecentActivities = async (req: Request, res: Response) => {
  try {
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5);
    const recentPets = await Pet.find().sort({ createdAt: -1 }).limit(5);
    res.status(200).json({ recentPets, recentUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "System failed. Please try again later!" });
  }
};
