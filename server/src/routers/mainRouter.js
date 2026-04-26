const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const mattressRouter = require("../routers/mattressRouter.js");
const companyRouter = require("../routers/companyRouter.js");
const shapesRouter = require("./shapesRouter");
const mattressTypesRouter = require("../routers/mattressTypesRouter.js");
const mattressRigidityRouter = require("./mattressRigidityRouter");
const feedbackRouter = require("./sendToTelegram.js");
const sitemapRouter = require("./sitemapRouter");
const adminRouter = require("./adminRouter");

router.use("/mattress", mattressRouter);
router.use("/company", companyRouter);
router.use("/shapes", shapesRouter);
router.use("/mattress-type", mattressTypesRouter);
router.use("/mattress-rigidity", mattressRigidityRouter);
router.use("/feedback", feedbackRouter);
router.use("/sitemap.xml", sitemapRouter);
router.use("/admin", adminRouter);

// Публичный эндпоинт — список изображений галереи
router.get("/gallery", (_req, res) => {
  try {
    const galleryDir = path.join(__dirname, "../uploads/gallery_images");
    if (!fs.existsSync(galleryDir)) return res.json([]);
    const files = fs
      .readdirSync(galleryDir)
      .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .map((file) => `/uploads/gallery_images/${file}`)
      .sort((a, b) => {
        const numA = parseInt(path.basename(a));
        const numB = parseInt(path.basename(b));
        if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
        return a.localeCompare(b);
      });
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении галереи" });
  }
});

// Публичный эндпоинт — настройки сайта (хиты продаж с данными матрасов)
router.get("/site-settings", async (_req, res) => {
  try {
    const settingsPath = path.join(__dirname, "../uploads/settings.json");
    const settings = fs.existsSync(settingsPath)
      ? JSON.parse(fs.readFileSync(settingsPath, "utf8"))
      : { bestsellers: [] };

    if (settings.bestsellers && settings.bestsellers.length > 0) {
      const { Mattress, Company } = require("../models");
      const enriched = await Promise.all(
        settings.bestsellers.map(async (b) => {
          try {
            const mattress = await Mattress.findByPk(b.mattressId, {
              include: [{ model: Company, attributes: ["name"] }],
            });
            if (!mattress) return null;
            return {
              id: b.mattressId,
              name: mattress.name,
              price: b.price,
              company: mattress.Company?.name || "",
              productID: b.mattressId,
              picPath: `/uploads/mattresses/${b.mattressId}/1.jpg`,
            };
          } catch {
            return null;
          }
        })
      );
      settings.bestsellers = enriched.filter(Boolean);
    }

    res.json(settings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка при получении настроек" });
  }
});

module.exports = router;
