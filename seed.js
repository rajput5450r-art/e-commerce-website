import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Wireless Headphones",
    description: "Comfortable over-ear wireless headphones with deep bass.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    brand: "SoundMax",
    countInStock: 20,
    rating: 4.5,
    numReviews: 120
  },
  {
    name: "Smart Watch",
    description: "Modern smartwatch with fitness tracking and notifications.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    category: "Electronics",
    brand: "TechTime",
    countInStock: 15,
    rating: 4.3,
    numReviews: 88
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes designed for everyday comfort.",
    price: 2199,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    brand: "RunPro",
    countInStock: 30,
    rating: 4.7,
    numReviews: 200
  },
  {
    name: "Backpack",
    description: "Water-resistant backpack for college, work and travel.",
    price: 1299,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
    category: "Fashion",
    brand: "UrbanPack",
    countInStock: 25,
    rating: 4.4,
    numReviews: 65
  },
  {
    name: "Coffee Maker",
    description: "Compact coffee maker for quick morning coffee.",
    price: 3299,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
    category: "Home",
    brand: "BrewMate",
    countInStock: 10,
    rating: 4.2,
    numReviews: 44
  },
  {
    name: "Gaming Keyboard",
    description: "Mechanical RGB keyboard with responsive switches.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    category: "Gaming",
    brand: "GameCore",
    countInStock: 18,
    rating: 4.6,
    numReviews: 102
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany({});
    await User.deleteMany({});

    await Product.insertMany(products);

    const password = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@example.com",
      password,
      isAdmin: true
    });

    console.log("Database seeded successfully");
    console.log("Admin: admin@example.com / admin123");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();