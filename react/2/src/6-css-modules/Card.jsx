// import "./Card.module.css";
import s from "./Card.module.css";

const Title = ({ children }) => <h2 className={s.title}>{children}</h2>;

export const Card = ({ title, description, img }) => {
  console.log("Card:", s.card, s.title);

  return (
    <article className={s.card}>
      <Title>Spiderman</Title>
      <img src={img} alt={title} width="200px" />
      <p>{description}</p>
    </article>
  );
};
