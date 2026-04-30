const express = require("express");
const router = express.Router();
const { AdminController, upload, uploadMain, uploadMattressImgs } = require("../controllers/adminController");

// Авторизация
router.post("/login", AdminController.login);

// Компании
router.get("/companies", AdminController.getCompanies);
router.post("/companies", upload.single("logo"), AdminController.createCompany);
router.put("/companies/:id", upload.single("logo"), AdminController.updateCompany);
router.delete("/companies/:id", AdminController.deleteCompany);

// Матрасы
router.get("/mattresses", AdminController.getMattresses);
router.post("/mattresses", AdminController.createMattress);
router.put("/mattresses/:id", AdminController.updateMattress);
router.delete("/mattresses/:id", AdminController.deleteMattress);

// Изображения матрасов
router.get("/mattresses/:id/images", AdminController.getMattressImages);
router.post("/mattresses/:id/images", uploadMattressImgs.array("images", 20), AdminController.uploadMattressImages);
router.delete("/mattresses/:id/images/:filename", AdminController.deleteMattressImage);

// Отзывы
router.get("/reviews", AdminController.getReviews);
router.post("/reviews", upload.single("review_image"), AdminController.uploadReview);
router.delete("/reviews/:filename", AdminController.deleteReview);

// Галерея
router.get("/gallery", AdminController.getGallery);
router.post("/gallery", upload.single("gallery_image"), AdminController.uploadGalleryImage);
router.delete("/gallery/:filename", AdminController.deleteGalleryImage);

// Главное изображение
router.post("/hero-image", uploadMain.single("hero_image"), AdminController.uploadHeroImage);

// Настройки сайта
router.get("/settings", AdminController.getSettings);
router.put("/settings", AdminController.updateSettings);

// Типы тканей
router.get("/clothing-types", AdminController.getClothingTypes);
router.post("/clothing-types", upload.single("clothing_type_image"), AdminController.createClothingType);
router.put("/clothing-types/:id", upload.single("clothing_type_image"), AdminController.updateClothingType);
router.delete("/clothing-types/:id", AdminController.deleteClothingType);

// Справочники
router.get("/types", AdminController.getTypes);
router.get("/shapes", AdminController.getShapes);
router.get("/rigidities", AdminController.getRigidities);
router.post("/rigidities", AdminController.createRigidity);

module.exports = router;
