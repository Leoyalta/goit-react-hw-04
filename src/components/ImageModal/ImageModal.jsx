import Modal from "react-modal";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90%",
    maxWidth: "60%",
    overflow: "hidden",
    padding: 0,
    border: "none",
    background: "transparent",
  },
};

export default function ImageModal({
  isOpen,
  closeModal,
  imageUrl,
  description,
  likes,
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      overlayClassName={css.overlay}
      className={css.wrapper}
    >
      <div className={css.content}>
        <img src={imageUrl} alt={description} className={css.image} />
        <div className={css.info}>
          <p className={css.description}>{description}</p>
          <p className={css.likes}>Likes: {likes}</p>
        </div>
      </div>
    </Modal>
  );
}
