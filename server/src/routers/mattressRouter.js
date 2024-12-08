const { Router } = require("express");
const router = new Router();
const MattressController = require("../controllers/mattressController.js");

router.get("", MattressController.getAll);
router.get("/:id", MattressController.getOne);

module.exports = router;
