const express = require('express')
const cors = require("cors");
//const sequelize = require("../src/config/database");
const swaggerSetup = require("../src/config/swagger");

//const app = express()
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// user
const userRoutes = require("../src/modules/user/user.routes");
//login for token
const authRoutes = require("../src/modules/auth/auth.routes");
// rule-services
const ruleService = require("../src/modules/rule-service/rule-service.routes")
// priceing
const priceing = require("../src/modules/priceing/priceing.routes")
// bulk-job
const bulkJob = require('../src/modules/bulk-job/bulk-job.routes')
// health
const health = require('../src/modules/health/health.routes')

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/rule-services", ruleService);
app.use("/api/quotes", priceing);
app.use("/api/jobs", bulkJob);
app.use("/api/health", health);

// use Swagger
swaggerSetup(app);

module.exports = app;
//const PORT = process.env.PORT || 9000;
//app.listen(PORT, () => console.log(`Server running on port ${PORT}`));