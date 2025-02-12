import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./Validation.module.css";

const translations = Object.freeze({
  username_too_short: { en: "Too Short!", pl: "Wartość za krótka!" },
  username_too_long: { en: "Too Long!", pl: "Wartość za długa!" },
  username_required: { en: "Username required", pl: "Imię jest wymagane" },

  email_not_valid: {
    en: "Must be a valid email.",
    pl: "Adres email musi być poprawny.",
  },
  email_required: { en: "Email required", pl: "Email jest wymagany" },

  topic_required: { en: "Topic required", pl: "Temat jest wymagany" },

  message_too_short: { en: "Too short", pl: "Wartość za krótka!" },
  message_too_long: { en: "Too long", pl: "Wartość za długa!" },
  message_required: { en: "Message required", pl: "Wiadomość jest wymagana" },

  accept_rules_invalid: {
    en: "You need to accept the TOS.",
    pl: "Musisz zaakceptować regulamin.",
  },
  accept_rules_required: {
    en: "Accepting TOS is required",
    pl: "Akceptacja regulaminu jest wymagana",
  },
});

// const locale = "en";
// const locale = "pl";
const locale = Math.random() > 0.5 ? "pl" : "en";

const t = (translationKey) => translations[translationKey][locale];

// https://github.com/jquense/yup?tab=readme-ov-file#localization-and-i18n
const ContactFormSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, t("username_too_short"))
    .max(50, t("username_too_long"))
    .required(t("username_required")),

  email: Yup.string().email(t("email_not_valid")).required(t("email_required")),

  topic: Yup.string()
    .oneOf(["mentoring", "feedback", "personal"])
    .required(t("topic_required")),

  message: Yup.string()
    .min(3, t("message_too_short"))
    .max(256, t("message_too_long"))
    .required(t("message_required")),

  "accept-rules": Yup.boolean()
    .isTrue(t("accept_rules_invalid"))
    .required(t("accept_rules_required")),
});

const initialValues = {
  username: "",
  email: "",
  topic: "mentoring",
  message: "",
  "accept-rules": false,
};

export const InternationalizedValidation = () => {
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
