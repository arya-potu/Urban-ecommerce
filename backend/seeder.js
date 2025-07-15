const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const User = require("./models/User");
const Cart = require("./models/Cart");
const products = require("./data/products");

dotenv.config();

const seedData = async () => {
    try {
        // Connect to MongoDB with proper options and wait for connection
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds
            socketTimeoutMS: 45000, // 45 seconds
        });

        console.log("Connected to MongoDB successfully!");

        // Clear existing data
        console.log("Clearing existing data...");
        await Product.deleteMany({});
        await User.deleteMany({});
        await Cart.deleteMany({});

        // Create default admin user
        console.log("Creating admin user...");
        const createdUser = await User.create({
            name: "Admin User",
            email: "admin@example.com",
            password: "admin123",
            role: "admin",
        });

        // Assign the default user id to each product
        const userID = createdUser._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: userID };
        });

        // Insert products into the database
        console.log("Inserting products...");
        await Product.insertMany(sampleProducts);
        
        console.log("Product data seeded successfully!");
        console.log(`${sampleProducts.length} products added to database`);
        
    } catch (error) {
        console.error("Error seeding the data:", error);
        process.exit(1); // Exit with failure
    } finally {
        // Close the connection
        await mongoose.connection.close();
        console.log("Database connection closed");
        process.exit(0); // Exit successfully
    }
};

seedData();