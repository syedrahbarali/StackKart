require("dotenv").config();
const app = require("./app")
const authRoutes = require("./routes/auth.routes")
const productRoutes = require("./routes/products.routes");
const categoryRoutes = require("./routes/categories.routes");
const customerRoutes = require("./routes/customer.routes");
const adminRoutes = require("./routes/admin.routes");

app.get("/", (req, res) => res.send("Hello World!"))

// auth routes: Login, Create Account
app.use("/api/v1/auth", authRoutes);

// product routes: createProduct, updateProduct, deletProduct
app.use("/api/v1/product", productRoutes);

// category routes: createCategory, updateCategory, deleteCategory
app.use("/api/v1/category", categoryRoutes);

// customer routes: createOrder
app.use("/api/v1/customer", customerRoutes)

// admin routes: dashboard Data
app.use("/api/v1/admin", adminRoutes)