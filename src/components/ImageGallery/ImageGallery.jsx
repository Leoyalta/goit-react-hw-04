import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ photos, openModal }) {
  return (
    <div>
      <ul className={css.list}>
        {photos.map(
          ({
            id,
            description,
            likes,
            views,
            downloads,
            urls: { small, regular },
          }) => (
            <li key={id} className={css.item}>
              <ImageCard
                src={small}
                alt={description}
                onClick={() =>
                  openModal({ regular, description, likes, views, downloads })
                }
              />
            </li>
          )
        )}
      </ul>
    </div>
  );
}
