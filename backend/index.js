const app = require("./src/app");
const sequelize = require("./src/config/database");

const PORT = process.env.PORT || 9000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("SQLite Connected");

    await sequelize.sync({ alter: true });
    console.log("DB synced");

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Startup Error:", err);
  }
})();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));