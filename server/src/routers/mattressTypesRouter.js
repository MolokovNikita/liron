const { Router } = require("express");
const router = new Router();
const MattressTypesController = require("../controllers/mattressTypesController");

router.get("", MattressTypesController.getAll);
router.get("/:id", MattressTypesController.getOne);

module.exports = router;
