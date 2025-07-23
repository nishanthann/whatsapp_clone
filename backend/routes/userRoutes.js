import express from "express";
import User from "../models/User.js";
import multer from "multer";
import fs from "fs";
import path from "path";

const router = express.Router();

// setup multer for image upload
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/:phone", async (req, res) => {
  try {
    const user = await User.findOne({ phone: req.params.phone });

    // profile image relative yrl to full url
    const profileImageUrl =
      user && user.profileImage
        ? `${req.protocol}://${req.get("host")}${user.profileImage}`
        : null;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({
        _id: user._id,
        phone: user.phone,
        name: user.name,
        profileImage: profileImageUrl,
      }); // Send found user data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create user with image upload api
// /post api/users

// / ✅ This handles user creation
router.post("/", upload.single("profileImage"), async (req, res) => {
  const { name, phone } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Handle uploaded image
    const profileImage = req.file ? `/uploads/${req.file.filename}` : null;

    // Create and save new user
    const newUser = new User({
      name,
      phone,
      profileImage,
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// update profile api
// put/api/users/:id
router.put("/:id", upload.single("profileImage"), async (req, res) => {
  const { name } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.file) {
      if (user.profileImage) {
        // remove old image
        const oldImagePath = path.join(process.cwd(), user.profileImage);
        if (fs.existsSync(oldImagePath)) {
          await fs.promises.unlink(oldImagePath);
        }
      }
      user.profileImage = `/uploads/${req.file.filename}`;
    }

    // update name

    if (name) {
      user.name = name;
    }
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
