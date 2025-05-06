const { Router } = require("express");
const router = new Router();
const MattressRigidityController = require("../controllers/mattressRigidityController");

router.get("", MattressRigidityController.getAll);
router.get("/:id", MattressRigidityController.getOne);

module.exports = router;
