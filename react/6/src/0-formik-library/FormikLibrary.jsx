import { useId } from "react";
import { Formik, Form, Field } from "formik";
import css from "./FormikLibrary.module.css";

const initialValues = {
  username: "",
  password: "",
};

export const FormikLibrary = () => {
  const usernameFieldId = useId();
  const passwordFieldId = useId();

  const handleSubmit = (values, actions) => {
    // Do something with the values here ;)
    console.log(values);

    console.log({ actions });

    actions.resetForm();
  };

  return (
    <main className="col wide-gap">
      <h1>Formik Library</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form} autoComplete="off">
          <h1 style={{ margin: 0 }}>Register</h1>

          <div className={css.field}>
            <label className={css.label} htmlFor={usernameFieldId}>
              Username:
            </label>
            <Field
              className={css.input}
              id={usernameFieldId}
              type="text"
              name="username"
              placeholder="John Doe"
            />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={passwordFieldId}>
              Password:
            </label>
            <Field
              className={css.input}
              id={passwordFieldId}
              type="password"
              name="password"
              placeholder="Secret Password"
            />
          </div>

          <button className={css.button} type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </main>
  );
};
