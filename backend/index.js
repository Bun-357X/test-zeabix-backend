const express = require('express')
const cors = require("cors");
const sequelize = require("./src/config/database");
const swaggerSetup = require("./src/config/swagger");

sequelize.sync({ force: false }) // if true will delete old DB and recreate
  .then(() => console.log("Database Synced"))
  .catch(err => console.error("Sync Error:", err));

const app = express()

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// user
const userRoutes = require("./src/modules/user/user.routes");
//login for token
const authRoutes = require("./src/modules/auth/auth.routes");

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// use Swagger
swaggerSetup(app);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));