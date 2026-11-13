import { useState } from "react";
import { imageUrl } from "../../../api";
import Button from "../Button";
import styles from "./ImageGallery.module.scss";

interface Props {
  images: string[];
  alt: string;
  children?: React.ReactNode;
  className?: string;
  imageClassName?: string;
  preventDefault?: boolean;
}

export default function ImageGallery({
  images,
  alt,
  children,
  className,
  imageClassName,
  preventDefault = false,
}: Props) {
  const [index, setIndex] = useState(0);
  const hasMultiple = images.length > 1;

  const prev = (e: React.MouseEvent) => {
    if (preventDefault) e.preventDefault();
    setIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e: React.MouseEvent) => {
    if (preventDefault) e.preventDefault();
    setIndex((i) => (i + 1) % images.length);
  };

  return (
    <div className={`${styles.gallery} ${className ?? ""}`}>
      <img
        src={imageUrl(images[index])}
        alt={alt}
        className={`${styles.image} ${imageClassName ?? ""}`}
      />
      {children}
      {hasMultiple && (
        <>
          <Button
            noStyles
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={prev}
            aria-label="Previous image"
          >
            ‹
          </Button>
          <Button
            noStyles
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={next}
            aria-label="Next image"
          >
            ›
          </Button>
          <div className={styles.dots}>
            {images.map((_, i) => (
              <Button
                noStyles
                key={i}
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => setIndex(i)}
                aria-label={`Go to image ${i + 1}`}
              >
                &nbsp;
              </Button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
