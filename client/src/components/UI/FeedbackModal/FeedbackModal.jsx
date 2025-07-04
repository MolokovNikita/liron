import styles from "./feedback-modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
import config from "../../../config/config";
export default function FeedbackModal({ isOpen, onClose, matrasses }) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        const parts = [];

        if (digits.length > 0) parts.push("+7");
        if (digits.length >= 2) parts.push(` (${digits.slice(1, 4)}`);
        if (digits.length >= 5) parts.push(`) ${digits.slice(4, 7)}`);
        if (digits.length >= 8) parts.push(`-${digits.slice(7, 9)}`);
        if (digits.length >= 10) parts.push(`-${digits.slice(9, 11)}`);

        return parts.join("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            // Оставляем только цифры, заменяем 8 на 7
            let raw = value.replace(/\D/g, "");
            if (raw.startsWith("8")) raw = "7" + raw.slice(1);
            if (raw.startsWith("7")) raw = raw.slice(0, 11);
            setForm((prev) => ({ ...prev, phone: raw }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, phone, message } = form;

        if (!name.trim()) return alert("Введите имя");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert("Некорректный email");
        if (phone.length !== 11) return alert("Введите корректный номер телефона");
        if (!message.trim()) return alert("Введите сообщение");
        try {
            axios.post(`${config.API_URL}/feedback`,
                { name, email, phone, message, matrasses });
            onClose();
            alert("Форма отправлена");
        } catch (err) {
            alert("Ошибка отправки. Попробуйте позже.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modal__overlay} onClick={onClose}>
            <div className={styles.modal__content} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={styles.modal__close}>
                    <CloseIcon />
                </button>
                <h2 className={styles.modal__title}>Связаться с нами</h2>
                <form className={styles.modal__form} onSubmit={handleSubmit}>
                    <label>
                        Ваше имя:
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Электронная почта:
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Номер телефона:
                        <input
                            type="tel"
                            name="phone"
                            value={formatPhone(form.phone)}
                            onChange={handleChange}
                            placeholder="+7 (___) ___-__-__"
                            required
                        />
                    </label>
                    <label>
                        Сообщение:
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </label>
                    <button type="submit" className={styles.modal__submit}>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    );
}
