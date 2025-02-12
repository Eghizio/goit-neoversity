import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Validation.module.css";

const ContactFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Username required"),

  email: Yup.string()
    .email("Must be a valid email.")
    .required("Email required"),

  topic: Yup.string()
    .oneOf(["mentoring", "feedback", "personal"])
    .required("Topic required"),

  message: Yup.string()
    .min(3, "Too short")
    .max(256, "Too long")
    .required("Message required"),

  "accept-rules": Yup.boolean()
    .isTrue("You need to accept the TOS.")
    .required("Accepting TOS is required"),
});

const initialValues = {
  username: "",
  email: "",
  topic: "mentoring",
  message: "",
  "accept-rules": false,
};

export const Validation = () => {
  const usernameFieldId = useId();
  const emailFieldId = useId();
  const topicFieldId = useId();
  const messageFieldId = useId();
  const rulesFieldId = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <main className="col wide-gap">
      <h1>Validation with Yup & Formik</h1>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={ContactFormSchema}
      >
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
            <ErrorMessage className="red" name="username" component="span" />
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
            />
            <ErrorMessage className="red" name="email" component="span" />
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
            <ErrorMessage className="red" name="topic" component="span" />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={messageFieldId}>
              Message:
            </label>
            <Field
              className={css.input}
              id={messageFieldId}
              as="textarea"
              rows="8"
              name="message"
              placeholder="Dear John. It is a nice movie. xoxo Savannah"
            />
            <ErrorMessage className="red" name="message" component="span" />
          </div>

          <div className={css.field}>
            <label className={css.label} htmlFor={rulesFieldId}>
              <Field id={rulesFieldId} type="checkbox" name="accept-rules" />
              I've read and accept Terms of Service
            </label>
            <ErrorMessage
              className="red"
              name="accept-rules"
              component="span"
            />
          </div>

          <button className={css.button} type="submit">
            Send
          </button>
        </Form>
      </Formik>
    </main>
  );
};
