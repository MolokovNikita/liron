const express = require("express");
const router = require("./routers/mainRouter.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./models"); // Подключаем Sequelize

dotenv.config();

const PORT = process.env.PORT || 5003;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: CLIENT_URL,
    allowedHeaders: ["Authorization", "Content-Type", "x-token"],
  }),
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("", router);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
app.set("view engine", "ejs");

async function startApp() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Successful connection to the database");

    await db.sequelize.sync();
    console.log("✅ Database synchronized");

    app.listen(PORT, () => {
      console.log(`✅ Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error in connection to the database:", error);
    throw new Error(error);
  }
}

startApp();
