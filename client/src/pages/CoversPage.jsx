import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/covers.module.css";
import { useEffect, useState } from "react";
import config from "../config/config";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CoversPage() {
    const [mattresses, setMattresses] = useState([]);

    useEffect(() => {
        axios.get(`${config.API_URL}/mattress`).then((res) => {
            setMattresses(res.data);
        });
    }, []);

    return (
        <>
            <Header />
            <div className={styles.container}>
                <h1 className={styles.title}>Наматрасники аквастоп для всех моделей</h1>
                <div className={styles.grid}>
                    {mattresses.map((mattress) => (
                        <Link key={mattress.id} to={`/covers/${mattress.id}`} className={styles.card}>
                            <div className={styles.cover__image__wrapper}>
                                <img
                                    src="/cover_placeholder.jpg"
                                    alt={`Наматрасник аквастоп на \"${mattress.name}\"`}
                                    className={styles.cover__image}
                                    loading="lazy"
                                />
                            </div>
                            <h2 className={styles.cover__title}>
                                Наматрасник аквастоп на "{mattress.name}"
                            </h2>
                            <div className={styles.cover__size}>
                                Размер: {mattress.width} x {mattress.length}
                            </div>
                            <div className={styles.cover__desc}>
                                Выполнен в виде простыни на стягивающей резинке из махровой ткани с непромокаемой мембраной.<br />
                                Хорошо впитывает и защищает матрас от влаги.<br />
                                Эти простыни изготавливаются, точно по размерам оригинального спального места.
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
} 