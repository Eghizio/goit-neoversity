import { useId } from "react";
import { Formik, Form, Field } from "formik";
import css from "./FormikInputFields.module.css";

const initialValues = {
  username: "",
  email: "",
  topic: "mentoring",
  message: "",
  "accept-rules": false,
};

export const FormikInputFields = () => {
  const usernameFieldId = useId();
  const emailFieldId = useId();
  const topicFieldId = useId();
  const messageFieldId = useId();
  const rulesFieldId = useId();

  console.log("Render", Date.now());

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
  };

  return (
    <main className="col wide-gap">
      <h1>Formik input field types</h1>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form className={css.form} autoComplete="off">
          <h1 style={{ margin: 0 }}>Contact Form</h1>

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
            <label className={css.label} htmlFor={emailFieldId}>
              Email:
            </label>
            <Field
              className={css.input}
              id={emailFieldId}
              type="email"
              name="email"
              placeholder="johndoe@email.com"
              required
            />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={topicFieldId}>
              Topic:
            </label>
            <Field
              className={css.input}
              id={topicFieldId}
              as="select"
              name="topic"
            >
              <option value="">Select a topic</option>
              <option value="mentoring">Mentoring</option>
              <option value="feedback">Feedback</option>
              <option value="personal">Personal</option>
            </Field>
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={messageFieldId}>
              Message:
            </label>
            <Field
              className={css.input}
              id={messageFieldId}
              as="textarea"
              rows="3"
              name="message"
              placeholder="Dear John. It is a nice movie. xoxo Savannah"
            />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={rulesFieldId}>
              <Field
                id={rulesFieldId}
                type="checkbox"
                name="accept-rules"
                required
              />
              I've read and accept Terms of Service
            </label>
          </div>

          <button className={css.button} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </main>
  );
};
