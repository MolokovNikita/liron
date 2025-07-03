import React, { useRef } from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import config from "../../../config/config";
import styles from './gallery-block.module.css';



const GalleryBlock = ({ images, showThumbnails = true }) => {
    const galleryRef = useRef(null);
    if (!images) return;

    const handleImageClick = () => {
        if (galleryRef.current) {
            galleryRef.current.toggleFullScreen();
        }
    };

    const renderItem = (item) => (
        <div className={styles.image_gallery_image}>
            <img
                src={item.original}
                onClick={handleImageClick}
                style={{ cursor: 'pointer' }}
                alt={item.description || ''}
            />
        </div>
    );

    return (
        <div className={styles.gallery_container}>
            <ImageGallery
                items={images}
                ref={galleryRef}
                showFullscreenButton={false}
                showPlayButton={false}
                renderItem={renderItem}
                additionalClass="custom-gallery"
                slideInterval={1000}
                // slideOnThumbnailOver={true}
                showIndex={false}
                // showBullets={true}
                showThumbnails={showThumbnails}
                thumbnailPosition="bottom"
                preventDefaultTouchmoveEvent={false}
            />
        </div>
    );
};

export default GalleryBlock;
