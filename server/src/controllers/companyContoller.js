const { Company } = require("../models");

class CompanyController {
  async getAll(req, res) {
    try {
      const companies = await Company.findAll();
      if (!companies.length) {
        return res.status(404).json({ error: "Companies not found" });
      }
      res.json(companies);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = new CompanyController();
