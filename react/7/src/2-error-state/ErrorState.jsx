import { useState } from "react";
import { RenderPolice } from "./components/RenderPolice";
import { ArticlesList } from "./components/ArticlesList";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";

const sleep = async (ms = 1_000) => new Promise((r) => setTimeout(r, ms));

const get = (url, options = {}) =>
  fetch(url, options)
    .then((response) => response.json())
    .catch(console.error);

const mapArticles = (data) => {
  return data.hits.map((article) => ({
    id: article.objectID,
    url: article.url,
    title: article.title,
    createdAt: article.created_at,
    author: article.author,
    stats: {
      points: article.points,
      comments: article.num_comments,
    },
  }));
};

const HACKERNEWS_API_URL = "https://hn.algolia.com/api/v1/search?query=react";

const FaultyHackernews = ({ delay = 10_000, withError = false }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Hackernews Articles:", articles);
  console.log({ isLoading });

  console.log({ withError });

  const loadArticles = async () => {
    setIsLoading(true);

    await sleep(delay);
    if (withError) throw new Error("Ooopsie. Failed to load articles.");

    const data = await get(HACKERNEWS_API_URL);
    const mappedArticles = mapArticles(data);

    setArticles(mappedArticles);

    setIsLoading(false);
  };

  const shouldShowArticles = articles.length > 0 && !isLoading;
  console.log({ shouldShowArticles });

  return (
    <section className="col wide-gap">
      <button className="blue" type="button" onClick={loadArticles}>
        Load articles
      </button>

      {shouldShowArticles ? <ArticlesList articles={articles} /> : null}
      {isLoading ? <Loader /> : null}
    </section>
  );
};

const Hackernews = ({ delay = 10_000, withError = false }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log("Hackernews Articles:", articles);
  console.log({ isLoading, isError });

  const loadArticles = async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      await sleep(delay);
      if (withError) throw new Error("Ooopsie. Failed to load articles.");
      const data = await get(HACKERNEWS_API_URL);
      const mappedArticles = mapArticles(data);

      setArticles(mappedArticles);
    } catch (error) {
      console.log(error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const shouldShowArticles = articles.length > 0 && !isLoading && !isError;
  console.log({ shouldShowArticles });

  return (
    <section className="col wide-gap">
      <button className="blue" type="button" onClick={loadArticles}>
        Load articles
      </button>

      {shouldShowArticles ? <ArticlesList articles={articles} /> : null}
      {isLoading && !isError ? <Loader /> : null}
      {!isLoading && isError ? <ErrorMessage onRetry={loadArticles} /> : null}
    </section>
  );
};

export const ErrorState = () => (
  <main className="col wide-gap">
    <h1>Error State</h1>

    <RenderPolice label="without Error">
      <FaultyHackernews delay={3_000} />
    </RenderPolice>

    <RenderPolice label="with probable Error">
      <FaultyHackernews delay={5_000} withError={Math.random() > 0.1} />
    </RenderPolice>

    <RenderPolice label="with certain Error">
      <Hackernews delay={3_000} withError={Math.random() > 0} />
    </RenderPolice>
  </main>
);
