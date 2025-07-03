import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "../styles/covercard.module.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import config from "../config/config";
import axios from "axios";

export default function CoverCardPage() {
    const { id } = useParams();
    const [mattress, setMattress] = useState(null);

    useEffect(() => {
        axios.get(`${config.API_URL}/mattress/${id}`).then((res) => {
            setMattress(res.data);
        });
    }, [id]);

    if (!mattress) return null;

    return (
        <>
            <Header />
            <div className={styles.container}>
                <div className={styles.card}>
                    <div className={styles.cover__image__wrapper}>
                        <img
                            src="/cover_placeholder.jpg"
                            alt={`Наматрасник аквастоп на \"${mattress.name}\"`}
                            className={styles.cover__image}
                            loading="lazy"
                        />
                    </div>
                    <h1 className={styles.cover__title}>
                        Наматрасник аквастоп на "{mattress.name}"
                    </h1>
                    <div className={styles.cover__size}>
                        Размер: {mattress.width} x {mattress.length}
                    </div>
                    <div className={styles.cover__desc}>
                        Выполнен в виде простыни на стягивающей резинке из махровой ткани с непромокаемой мембраной.<br />
                        Хорошо впитывает и защищает матрас от влаги.<br />
                        Эти простыни изготавливаются, точно по размерам оригинального спального места.
                    </div>
                    <Link to="/covers" className={styles.back__btn}>Назад к списку наматрасников</Link>
                </div>
            </div>
            <Footer />
        </>
    );
} 