import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  return (
    <Formik
      initialValues={{ search: "" }}
      onSubmit={(values, actions) => {
        onSubmit(values.search);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <Field
          className={css.input}
          name="search"
          type="text"
          placeholder="Search images..."
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </Form>
    </Formik>
  );
}
