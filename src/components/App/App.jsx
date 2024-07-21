import css from "./App.module.css";
import { useState, useEffect } from "react";
import { fetchPhotos } from "../../photo-api";

import SearchBar from "../SearchBar/SearchBar";
import toast, { Toaster } from "react-hot-toast";
import ImageGallery from "../ImageGallery/ImageGallery";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";

export default function App() {
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [modalLikes, setModalLikes] = useState("");

  const handleSubmit = (newTopic) => {
    setPhotos([]);
    setPage(1);
    setTopic(newTopic);
  };

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    } else {
      toast.info("No more photos to load.");
    }
  };

  useEffect(() => {
    async function getMorePhotos() {
      if (!topic) return;

      try {
        setLoading(true);
        setError(false);
        const response = await fetchPhotos(topic, page);
        const { results, total_pages } = response;

        if (results.length === 0 && page > 1) {
          toast.info("No more photos to load.");
        } else {
          setPhotos((prevPhotos) => [...prevPhotos, ...results]);
          setTotalPages(total_pages);
          toast.success(`Found ${results.length} images for "${topic}"`);
        }
      } catch (error) {
        toast.error("Oops, something went wrong.. reload the page!");
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    getMorePhotos();
  }, [page, topic]);

  const openModal = ({ regular, description, likes }) => {
    if (!modalIsOpen) {
      setModalImage(regular);
      setModalIsOpen(true);
      setModalDescription(description);
      setModalLikes(likes);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setModalImage("");
  };

  return (
    <section className={css.wrapper}>
      <SearchBar onSubmit={handleSubmit} />
      <ImageGallery photos={photos} openModal={openModal} />
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {photos.length > 0 && !loading && page < totalPages && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <Toaster
        position="top-right"
        duration={3000}
        reverseOrder={false}
        theme="dark"
        toastOptions={{
          style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#fff",
            background: "#333",
          },
        }}
      />
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          closeModal={closeModal}
          imageUrl={modalImage}
          description={modalDescription}
          likes={modalLikes}
        />
      )}
    </section>
  );
}
