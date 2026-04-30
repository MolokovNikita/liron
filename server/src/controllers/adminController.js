const { Company, Mattress, MattressType, MattressShape, MattressRigidity, ClothingType, MattressClothingType } = require("../models");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Основное хранилище для логотипов, отзывов и галереи
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, "../uploads");

    if (file.fieldname === "logo") {
      uploadPath = path.join(uploadPath, "companylogo");
    } else if (file.fieldname === "review_image") {
      uploadPath = path.join(uploadPath, "reviews");
    } else if (file.fieldname === "gallery_image") {
      uploadPath = path.join(uploadPath, "gallery_images");
    } else if (file.fieldname === "clothing_type_image") {
      uploadPath = path.join(uploadPath, "clothing_types");
    }

    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const imageFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  if (
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Только изображения разрешены!"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: imageFilter,
});

// Хранилище для главного hero-изображения (фиксированное имя файла)
const mainImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, "main_image.jpg");
  },
});

const uploadMain = multer({
  storage: mainImageStorage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter: imageFilter,
});

// Хранилище для изображений матрасов (папка по ID матраса)
const mattressImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const id = req.params.id;
    const uploadPath = path.join(__dirname, `../uploads/mattresses/${id}`);
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const id = req.params.id;
    const uploadPath = path.join(__dirname, `../uploads/mattresses/${id}`);
    let nextNum = 1;
    if (fs.existsSync(uploadPath)) {
      const files = fs
        .readdirSync(uploadPath)
        .filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
      const nums = files.map((f) => parseInt(f) || 0).filter((n) => n > 0);
      if (nums.length) nextNum = Math.max(...nums) + 1;
    }
    cb(null, `${nextNum}.jpg`);
  },
});

const uploadMattressImgs = multer({
  storage: mattressImageStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: imageFilter,
});

const SETTINGS_PATH = path.join(__dirname, "../uploads/settings.json");

function readSettings() {
  if (!fs.existsSync(SETTINGS_PATH)) return { bestsellers: [] };
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_PATH, "utf8"));
  } catch {
    return { bestsellers: [] };
  }
}

class AdminController {
  constructor() {
    const prototype = Object.getPrototypeOf(this);
    for (const key of Object.getOwnPropertyNames(prototype)) {
      if (key === "constructor") continue;
      if (typeof this[key] === "function") {
        this[key] = this[key].bind(this);
      }
    }
  }

  // ========== АВТОРИЗАЦИЯ ==========
  async login(req, res) {
    const { username, password } = req.body;
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
      res.json({ success: true, message: "Авторизация успешна" });
    } else {
      res.status(401).json({ success: false, message: "Неверные учетные данные" });
    }
  }

  // ========== КОМПАНИИ ==========
  async getCompanies(req, res) {
    try {
      const companies = await Company.findAll({ order: [["id", "ASC"]] });
      const companiesWithLogo = companies.map((company) => {
        const data = company.toJSON();
        if (!data.logo) {
          data.logo = `/uploads/companylogo/${data.name.toLowerCase()}.jpg`;
        }
        return data;
      });
      res.json(companiesWithLogo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении компаний" });
    }
  }

  async createCompany(req, res) {
    try {
      const { name } = req.body;
      const logo = req.file ? `/uploads/companylogo/${req.file.filename}` : null;
      const company = await Company.create({ name, logo });
      const data = company.toJSON();
      if (!data.logo) data.logo = `/uploads/companylogo/${data.name.toLowerCase()}.jpg`;
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании компании" });
    }
  }

  async updateCompany(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const logo = req.file ? `/uploads/companylogo/${req.file.filename}` : undefined;

      const company = await Company.findByPk(id);
      if (!company) return res.status(404).json({ error: "Компания не найдена" });

      if (logo && company.logo) {
        const standardPath = `/uploads/companylogo/${company.name.toLowerCase()}.jpg`;
        if (company.logo !== standardPath) {
          const oldPath = path.join(__dirname, "..", company.logo);
          if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
        }
      }

      const updateData = { name };
      if (logo) updateData.logo = logo;
      await company.update(updateData);
      await company.reload();
      res.json(company.toJSON());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при обновлении компании" });
    }
  }

  async deleteCompany(req, res) {
    try {
      const { id } = req.params;
      const company = await Company.findByPk(id);
      if (!company) return res.status(404).json({ error: "Компания не найдена" });

      if (company.logo) {
        const logoPath = path.join(__dirname, "..", company.logo);
        if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);
      }

      await company.destroy();
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении компании" });
    }
  }

  // ========== МАТРАСЫ ==========

  // Включение связей в запросы матраса
  _mattressIncludes() {
    return [
      { model: Company,         attributes: ["id", "name"] },
      { model: MattressType,    attributes: ["id", "type_name"] },
      { model: MattressShape,   attributes: ["id", "shape_name"] },
      { model: MattressRigidity, as: "MattressRigidities", attributes: ["id", "rigidity_name"] },
      { model: ClothingType,    as: "ClothingTypes", attributes: ["id", "name", "description", "image"],
        through: { attributes: ["order"] } },
    ];
  }

  // Установка ClothingTypes с сохранением порядка
  async _setClothingTypes(mattressId, idsInOrder) {
    await MattressClothingType.destroy({ where: { mattress_id: mattressId } });
    if (idsInOrder && idsInOrder.length > 0) {
      await Promise.all(
        idsInOrder.map((ctId, idx) =>
          MattressClothingType.create({ mattress_id: mattressId, clothing_type_id: ctId, order: idx })
        )
      );
    }
  }

  async getMattresses(req, res) {
    try {
      const mattresses = await Mattress.findAll({
        include: this._mattressIncludes(),
        order: [["id", "ASC"]],
      });
      res.json(mattresses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении матрасов" });
    }
  }

  async createMattress(req, res) {
    try {
      const {
        name, company_id, mattress_type_id, mattress_shape_id,
        material, price, description,
        width, length, thickness, pictures_count, max_weight,
        rigidity_ids, clothing_type_ids,
      } = req.body;

      const mattress = await Mattress.create({
        name,
        company_id: parseInt(company_id),
        mattress_type_id: mattress_type_id ? parseInt(mattress_type_id) : null,
        mattress_shape_id: mattress_shape_id ? parseInt(mattress_shape_id) : null,
        material:      material ? JSON.parse(material) : [],
        price:         price    ? JSON.parse(price)    : [],
        description,
        width,
        length,
        thickness,
        pictures_count: pictures_count ? parseInt(pictures_count) : 0,
        max_weight:     max_weight     ? parseInt(max_weight)     : null,
      });

      if (rigidity_ids !== undefined) {
        await mattress.setMattressRigidities(JSON.parse(rigidity_ids) || []);
      }
      if (clothing_type_ids !== undefined) {
        await this._setClothingTypes(mattress.id, JSON.parse(clothing_type_ids) || []);
      }

      const created = await Mattress.findByPk(mattress.id, { include: this._mattressIncludes() });
      res.json(created);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании матраса", details: error.message });
    }
  }

  async updateMattress(req, res) {
    try {
      const { id } = req.params;
      const {
        name, company_id, mattress_type_id, mattress_shape_id,
        material, price, description,
        width, length, thickness, pictures_count, max_weight,
        rigidity_ids, clothing_type_ids,
      } = req.body;

      const mattress = await Mattress.findByPk(id);
      if (!mattress) return res.status(404).json({ error: "Матрас не найден" });

      await mattress.update({
        name,
        company_id:        company_id        ? parseInt(company_id)        : mattress.company_id,
        mattress_type_id:  mattress_type_id  ? parseInt(mattress_type_id)  : mattress.mattress_type_id,
        mattress_shape_id: mattress_shape_id ? parseInt(mattress_shape_id) : mattress.mattress_shape_id,
        material:      material  ? JSON.parse(material)  : mattress.material,
        price:         price     ? JSON.parse(price)     : mattress.price,
        description:   description   !== undefined ? description   : mattress.description,
        width:         width         !== undefined ? width         : mattress.width,
        length:        length        !== undefined ? length        : mattress.length,
        thickness:     thickness     !== undefined ? thickness     : mattress.thickness,
        pictures_count: pictures_count !== undefined ? parseInt(pictures_count) : mattress.pictures_count,
        max_weight:    max_weight    ? parseInt(max_weight) : mattress.max_weight,
      });

      if (rigidity_ids !== undefined) {
        await mattress.setMattressRigidities(JSON.parse(rigidity_ids) || []);
      }
      if (clothing_type_ids !== undefined) {
        await this._setClothingTypes(id, JSON.parse(clothing_type_ids) || []);
      }

      const updated = await Mattress.findByPk(id, { include: this._mattressIncludes() });
      res.json(updated);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при обновлении матраса", details: error.message });
    }
  }

  async deleteMattress(req, res) {
    try {
      const { id } = req.params;
      const mattress = await Mattress.findByPk(id);
      if (!mattress) return res.status(404).json({ error: "Матрас не найден" });
      await mattress.destroy();
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении матраса" });
    }
  }

  // ========== ИЗОБРАЖЕНИЯ МАТРАСОВ ==========
  async getMattressImages(req, res) {
    try {
      const { id } = req.params;
      const mattressDir = path.join(__dirname, `../uploads/mattresses/${id}`);
      if (!fs.existsSync(mattressDir)) return res.json([]);
      const files = fs
        .readdirSync(mattressDir)
        .filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f))
        .map((file) => ({ filename: file, path: `/uploads/mattresses/${id}/${file}` }))
        .sort((a, b) => (parseInt(a.filename) || 0) - (parseInt(b.filename) || 0));
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка" });
    }
  }

  async uploadMattressImages(req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ error: "Файлы не загружены" });
      }
      const { id } = req.params;

      // Обновляем pictures_count
      const mattress = await Mattress.findByPk(id);
      if (mattress) {
        const mattressDir = path.join(__dirname, `../uploads/mattresses/${id}`);
        const count = fs
          .readdirSync(mattressDir)
          .filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).length;
        await mattress.update({ pictures_count: count });
      }

      res.json({
        success: true,
        files: req.files.map((f) => ({
          filename: f.filename,
          path: `/uploads/mattresses/${id}/${f.filename}`,
        })),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при загрузке" });
    }
  }

  async deleteMattressImage(req, res) {
    try {
      const { id, filename } = req.params;
      const filePath = path.join(__dirname, `../uploads/mattresses/${id}`, filename);
      if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Файл не найден" });
      fs.unlinkSync(filePath);

      // Обновляем pictures_count
      const mattress = await Mattress.findByPk(id);
      if (mattress) {
        const mattressDir = path.join(__dirname, `../uploads/mattresses/${id}`);
        const count = fs
          .readdirSync(mattressDir)
          .filter((f) => /\.(jpg|jpeg|png|gif|webp)$/i.test(f)).length;
        await mattress.update({ pictures_count: count });
      }

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении" });
    }
  }

  // ========== ОТЗЫВЫ ==========
  async getReviews(req, res) {
    try {
      const reviewsDir = path.join(__dirname, "../uploads/reviews");
      if (!fs.existsSync(reviewsDir)) return res.json([]);
      const files = fs
        .readdirSync(reviewsDir)
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map((file, index) => ({
          id: index + 1,
          filename: file,
          path: `/uploads/reviews/${file}`,
        }))
        .sort((a, b) => a.filename.localeCompare(b.filename));
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении отзывов" });
    }
  }

  async uploadReview(req, res) {
    try {
      if (!req.file) return res.status(400).json({ error: "Файл не загружен" });
      res.json({
        success: true,
        filename: req.file.filename,
        path: `/uploads/reviews/${req.file.filename}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при загрузке отзыва" });
    }
  }

  async deleteReview(req, res) {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "../uploads/reviews", filename);
      if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Файл не найден" });
      fs.unlinkSync(filePath);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении отзыва" });
    }
  }

  // ========== ГАЛЕРЕЯ ==========
  async getGallery(req, res) {
    try {
      const galleryDir = path.join(__dirname, "../uploads/gallery_images");
      if (!fs.existsSync(galleryDir)) return res.json([]);
      const files = fs
        .readdirSync(galleryDir)
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map((file, index) => ({
          id: index + 1,
          filename: file,
          path: `/uploads/gallery_images/${file}`,
        }))
        .sort((a, b) => {
          const numA = parseInt(a.filename);
          const numB = parseInt(b.filename);
          if (!isNaN(numA) && !isNaN(numB)) return numA - numB;
          return a.filename.localeCompare(b.filename);
        });
      res.json(files);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении галереи" });
    }
  }

  async uploadGalleryImage(req, res) {
    try {
      if (!req.file) return res.status(400).json({ error: "Файл не загружен" });
      res.json({
        success: true,
        filename: req.file.filename,
        path: `/uploads/gallery_images/${req.file.filename}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при загрузке" });
    }
  }

  async deleteGalleryImage(req, res) {
    try {
      const { filename } = req.params;
      const filePath = path.join(__dirname, "../uploads/gallery_images", filename);
      if (!fs.existsSync(filePath)) return res.status(404).json({ error: "Файл не найден" });
      fs.unlinkSync(filePath);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении" });
    }
  }

  // ========== ГЛАВНОЕ ИЗОБРАЖЕНИЕ ==========
  async uploadHeroImage(req, res) {
    try {
      if (!req.file) return res.status(400).json({ error: "Файл не загружен" });
      res.json({ success: true, path: `/uploads/main_image.jpg` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при загрузке" });
    }
  }

  // ========== НАСТРОЙКИ САЙТА ==========
  async getSettings(req, res) {
    try {
      res.json(readSettings());
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении настроек" });
    }
  }

  async updateSettings(req, res) {
    try {
      fs.writeFileSync(SETTINGS_PATH, JSON.stringify(req.body, null, 2));
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при сохранении настроек" });
    }
  }

  // ========== СПРАВОЧНИКИ ==========
  async getTypes(req, res) {
    try {
      const types = await MattressType.findAll({ order: [["id", "ASC"]] });
      res.json(types);
    } catch (error) {
      res.status(500).json({ error: "Ошибка" });
    }
  }

  async getShapes(req, res) {
    try {
      const shapes = await MattressShape.findAll({ order: [["id", "ASC"]] });
      res.json(shapes);
    } catch (error) {
      res.status(500).json({ error: "Ошибка" });
    }
  }

  async getRigidities(req, res) {
    try {
      const rigidities = await MattressRigidity.findAll({ order: [["id", "ASC"]] });
      res.json(rigidities);
    } catch (error) {
      res.status(500).json({ error: "Ошибка" });
    }
  }

  async createRigidity(req, res) {
    try {
      const rigidityName = req.body.rigidity_name?.trim();
      if (!rigidityName) {
        return res.status(400).json({ error: "Укажите название жёсткости" });
      }

      const existingRigidity = await MattressRigidity.findOne({
        where: { rigidity_name: rigidityName },
      });
      if (existingRigidity) {
        return res.status(409).json({ error: "Такая жёсткость уже существует" });
      }

      const rigidity = await MattressRigidity.create({ rigidity_name: rigidityName });
      res.status(201).json(rigidity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании жёсткости" });
    }
  }

  // ========== ТИПЫ ТКАНЕЙ ==========
  async getClothingTypes(req, res) {
    try {
      const types = await ClothingType.findAll({ order: [["id", "ASC"]] });
      res.json(types);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при получении типов тканей" });
    }
  }

  async createClothingType(req, res) {
    try {
      const { name, description } = req.body;
      const image = req.file ? `/uploads/clothing_types/${req.file.filename}` : null;
      const ct = await ClothingType.create({ name, description, image });
      res.json(ct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при создании типа ткани" });
    }
  }

  async updateClothingType(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const ct = await ClothingType.findByPk(id);
      if (!ct) return res.status(404).json({ error: "Тип ткани не найден" });

      // Удаляем старое изображение при загрузке нового
      if (req.file && ct.image) {
        const oldPath = path.join(__dirname, "..", ct.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      const image = req.file ? `/uploads/clothing_types/${req.file.filename}` : ct.image;
      await ct.update({ name, description, image });
      res.json(ct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при обновлении типа ткани" });
    }
  }

  async deleteClothingType(req, res) {
    try {
      const { id } = req.params;
      const ct = await ClothingType.findByPk(id);
      if (!ct) return res.status(404).json({ error: "Тип ткани не найден" });

      if (ct.image) {
        const imgPath = path.join(__dirname, "..", ct.image);
        if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
      }

      await ct.destroy();
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Ошибка при удалении типа ткани" });
    }
  }
}

const adminController = new AdminController();

module.exports = { AdminController: adminController, upload, uploadMain, uploadMattressImgs };
