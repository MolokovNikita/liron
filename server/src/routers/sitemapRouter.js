const express = require("express");
const router = express.Router();
const db = require("../models");

const BASE_URL = "https://liron-fura.ru";

router.get("/", async (req, res) => {
    // Получаем все компании и матрасы с названием компании
    const companies = await db.Company.findAll();
    const mattresses = await db.Mattress.findAll({
        include: [{
            model: db.Company,
            as: 'Company', // alias с большой буквы
            attributes: ['name']
        }]
    });

    let urls = [
        { loc: `${BASE_URL}/`, changefreq: "daily", priority: "1.0" },
        { loc: `${BASE_URL}/catalog`, changefreq: "weekly", priority: "0.9" },
        { loc: `${BASE_URL}/cart`, changefreq: "weekly", priority: "0.8" },
        { loc: `${BASE_URL}/payment`, changefreq: "monthly", priority: "0.7" },
        { loc: `${BASE_URL}/contacts`, changefreq: "monthly", priority: "0.7" },
        { loc: `${BASE_URL}/about`, changefreq: "monthly", priority: "0.6" },
        { loc: `${BASE_URL}/covers`, changefreq: "monthly", priority: "0.6" },
    ];

    // Динамические страницы компаний
    companies.forEach(company => {
        urls.push({
            loc: `${BASE_URL}/catalog/${encodeURIComponent(company.name)}`,
            changefreq: "weekly",
            priority: "0.7"
        });
    });

    // Динамические страницы товаров
    mattresses.forEach(mattress => {
        const companyName = mattress.Company?.name || 'unknown';
        urls.push({
            loc: `${BASE_URL}/catalog/${encodeURIComponent(companyName)}/${mattress.id}`,
            changefreq: "weekly",
            priority: "0.7"
        });
        urls.push({
            loc: `${BASE_URL}/covers/${mattress.id}`,
            changefreq: "monthly",
            priority: "0.6"
        });
    });

    // Формируем XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `
    <url>
        <loc>${url.loc}</loc>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>
`).join("")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
});

module.exports = router;