require("dotenv").config();
const app = require("./app")
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/products.routes");
const categoryRoutes = require("./routes/categories.routes");

app.get("/", (req, res) => res.send("Hello World!"))

// auth routes
app.use("/api/v1/auth/", authRoutes);
app.use("/api/v1/product/", productRoutes);
app.use("/api/v1/category/", categoryRoutes);