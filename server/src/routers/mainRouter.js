const express = require("express");
const router = express.Router();

const mattressRouter = require("../routers/mattressRouter.js");
const companyRouter = require("../routers/companyRouter.js");
const shapesRouter = require("../routers/shapesRouter.js");
const mattressTypesRouter = require("../routers/mattressTypesRouter.js");
router.use("/mattress", mattressRouter);
router.use("/company", companyRouter);
router.use("/shapes", shapesRouter);
router.use("/mattress-type", mattressTypesRouter);
module.exports = router;
