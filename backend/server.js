const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const subscribeRoute = require("./routes/subscribeRoute");
const adminRoutes = require("./routes/adminRoutes");
const productAdminRoutes = require("./routes/productAdminRoutes");
const adminOrderRoutes = require("./routes/adminOrderRoutes");

dotenv.config();


console.log("Starting server.js"); // Add this line

const app = express();
app.use(express.json());
app.use(cors());

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscribeRoute);

// admin 
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);




const PORT = process.env.PORT || 3000;

// Connect to MongoDB
console.log("Calling connectDB()"); // Add this line
connectDB();
console.log("connectDB() called"); // Add this line

app.get("/", (req, res) => {
    res.send("Welcome to the backend server!");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});