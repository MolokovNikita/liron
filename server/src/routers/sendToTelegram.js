const express = require("express");
const axios = require("axios");
const router = express.Router();

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

const CLASS_NAMES = ["Комфорт", "Премиум"];
function formatMattresses(mattresses) {
    let total = 0;

    const result = mattresses.map((mattress, idx) => {
        const name = mattress.name || '—';
        const classIndex = mattress.classIndex ?? 0;
        const clotheIndex = mattress.clothe ?? 0;
        const type = mattress.type;

        if (type === 'cover') {
            // Для наматрасника
            const price = typeof mattress.price === 'number' ? mattress.price : parseInt(mattress.price, 10) || 0;
            total += price * (mattress.quantity || 1);
            return `Наматрасник #${idx + 1}:
Название: ${name}
Размер: ${mattress.width} x ${mattress.length}
Количество: ${mattress.quantity || 1}
Итоговая цена: ${price * (mattress.quantity || 1)} руб.`;
        } else {
            // Для обычного матраса
            const clothing = mattress.clothing_types?.[clotheIndex] ?? '—';
            const priceRaw = mattress.price?.[classIndex]?.[clotheIndex];
            const price = typeof priceRaw === 'number' ? priceRaw : parseInt(priceRaw, 10) || 0;
            total += price * (mattress.quantity || 1);
            const mattressClass = CLASS_NAMES[classIndex] || '—';
            return `Матрас #${idx + 1}:
Название: ${name}
Ткань: ${clothing}
Класс: ${mattressClass}
Количество: ${mattress.quantity || 1}
Итоговая цена: ${price * (mattress.quantity || 1)} руб.`;
        }
    });

    return {
        text: result.join('\n\n'),
        total,
    };
}

router.post("/", async (req, res) => {
    const { name, email, phone, message, matrasses } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const { text: matrassesText, total: totalPrice } = formatMattresses(matrasses || []);

    const fullMessage = `Новая заявка с сайта:
Имя: ${name}
Email: ${email}
Телефон: ${phone}
Сообщение: ${message}

Матрасы:

${matrassesText}

Общая итоговая цена: ${totalPrice} руб.`;

    try {
        await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
            chat_id: CHAT_ID,
            text: fullMessage,
        });
        res.status(200).json({ ok: true });
    } catch (e) {
        console.error(e);
        res.status(500).json({ ok: false, error: e.message });
    }
});

module.exports = router;
