const { Router } = require("express");
const router = new Router();
const CompanyController = require("../controllers/companyContoller.js");

router.get("", CompanyController.getAll);

module.exports = router;
