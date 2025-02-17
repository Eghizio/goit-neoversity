import { FaCaretUp, FaCommentAlt, FaLink } from "react-icons/fa";
import css from "./ArticlesList.module.css";

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
};

const Highlight = ({ children }) => (
  <span className={css.highlight}>{children}</span>
);

const Article = ({
  article: {
    author,
    createdAt,
    id,
    stats: { points, comments },
    title,
    url,
  },
}) => {
  return (
    <article className={css.article} id={id}>
      <header>
        <a className={css.link} href={url} target="_blank" title={url}>
          <h3 className={css.title}>
            <FaLink className={css.icon} size={24} /> {title}
          </h3>
        </a>
      </header>

      <main className={css.content}>
        <p>
          Author: <Highlight>{author}</Highlight>
        </p>
        <p>
          Date of publication: <Highlight>{formatDate(createdAt)}</Highlight>
        </p>
      </main>

      <footer className={css.footer}>
        <p className={css.stat}>
          <FaCaretUp className={css.icon} size={24} />
          <Highlight>{points}</Highlight> points
        </p>
        <p className={css.stat}>
          <FaCommentAlt className={css.icon} size={24} />
          <Highlight>{comments}</Highlight> comments
        </p>
      </footer>
    </article>
  );
};

export const ArticlesList = ({ articles }) => {
  return (
    <ol className={css.list}>
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </ol>
  );
};
