const express = require("express");
const router = require("./routers/mainRouter.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const path = require("path");
const db = require("./models");

dotenv.config();

const PORT = process.env.PORT || 5003;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: function (origin, callback) {
      // Разрешаем запросы без origin (например, Postman, curl)
      if (!origin) return callback(null, true);
      
      // Разрешенные origins
      const allowedOrigins = [
        CLIENT_URL,
        "https://liron-fura.ru",
        "http://194.58.126.194:5173",
        "http://localhost:5173"
      ];
      
      if (allowedOrigins.indexOf(origin) !== -1 || origin.includes("liron-fura.ru")) {
        callback(null, true);
      } else {
        callback(null, true); // Временно разрешаем все для отладки
      }
    },
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
