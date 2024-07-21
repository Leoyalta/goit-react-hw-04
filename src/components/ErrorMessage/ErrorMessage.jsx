import css from "./ErrorMessage.module.css";
export default function ErrorMessage() {
  return (
    <>
      <p className={css.text}>
        Oops... something went wrong.. reload the page!
      </p>
    </>
  );
}
