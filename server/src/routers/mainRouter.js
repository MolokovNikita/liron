const express = require("express");
const router = express.Router();

const mattressRouter = require("../routers/mattressRouter.js");
const companyRouter = require("../routers/companyRouter.js");
const shapesRouter = require("./shapesRouter");
const mattressTypesRouter = require("../routers/mattressTypesRouter.js");
const mattressRigidityRouter = require("./mattressRigidityRouter");
const feedbackRouter = require("./sendToTelegram.js");

router.use("/mattress", mattressRouter);
router.use("/company", companyRouter);
router.use("/shapes", shapesRouter);
router.use("/mattress-type", mattressTypesRouter);
router.use("/mattress-rigidity", mattressRigidityRouter);
router.use("/feedback", feedbackRouter);

module.exports = router;
