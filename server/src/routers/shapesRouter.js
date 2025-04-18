const { Router } = require("express");
const router = new Router();
const ShapesController = require("../controllers/shapesController.js");

router.get("", ShapesController.getAll);
router.get("/:id", ShapesController.getOne);

module.exports = router;
