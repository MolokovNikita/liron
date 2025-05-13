import styles from '../../styles/map.module.css'
export default function Map(props) {
    return (
        <div className={styles.contacts__map}>
            <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A9777c7322b74eb19b5e33c851e135402254b56719371c0f32fba5e9748a1cd7f&amp;source=constructor"
                className={styles.contacts__iframe}
                title="Yandex Map"
                allowFullScreen
            ></iframe>
        </div>
    )
}