const { Company } = require("../models");

class CompanyController {
  async getAll(req, res) {
    try {
      const companies = await Company.findAll();
      if (!companies.length) {
        return res.status(404).json({ error: "Companies not found" });
      }
      // Добавляем поле logo с fallback, если оно отсутствует
      const companiesWithLogo = companies.map(company => {
        const companyData = company.toJSON();
        if (!companyData.logo) {
          companyData.logo = `/uploads/companylogo/${companyData.name.toLowerCase()}.jpg`;
        }
        return companyData;
      });
      res.json(companiesWithLogo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = new CompanyController();
