import { useEffect, useState } from "react";
import { ArticlesList } from "./components/ArticlesList";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import { HackernewsAPI } from "./api/hackernews";

export const Hackernews = ({ topic }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const loadArticles = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const hnArticles = await HackernewsAPI.getArticlesByTopic(topic);

      setArticles(hnArticles);
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadArticles();
  }, [topic]);

  const shouldShowArticles = articles.length > 0 && !isLoading && !isError;

  return (
    <section className="col wide-gap">
      {shouldShowArticles ? <ArticlesList articles={articles} /> : null}
      {isLoading && !isError ? <Loader /> : null}
      {!isLoading && isError ? <ErrorMessage onRetry={loadArticles} /> : null}
    </section>
  );
};
