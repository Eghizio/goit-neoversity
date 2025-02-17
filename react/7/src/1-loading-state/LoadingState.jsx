import { useEffect, useState } from "react";
import { RenderPolice } from "./components/RenderPolice";
import { ArticlesList } from "./components/ArticlesList";
import { Loader } from "./components/Loader"; /*  Simple & Fancy loader */

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

const HackernewsArticles = () => {
  const [articles, setArticles] = useState([]);

  console.log("Hackernews Articles:", articles);

  useEffect(() => {
    (async () => {
      await sleep(10_000);

      const data = await get(HACKERNEWS_API_URL);
      const mappedArticles = mapArticles(data);
      /* throw new Error("404"); */

      setArticles(mappedArticles);
    })();
  }, []);

  return (
    <section className="border">
      <h2>Hackernews</h2>

      <ol className="col">
        {articles.length > 0 ? (
          articles.map((article) => <li key={article.id}>{article.title}</li>)
        ) : (
          <p className="orange">No articles yet!</p>
        )}
      </ol>
    </section>
  );
};

const LoadingHackernewsArticles = ({ delay = 10_000 }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  console.log("Hackernews Articles:", articles);
  console.log({ isLoading });

  const loadArticles = async () => {
    setIsLoading(true);

    await sleep(delay);

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

export const LoadingState = () => (
  <main className="col wide-gap">
    <h1>Loading State</h1>

    <RenderPolice>
      <HackernewsArticles />
    </RenderPolice>

    <RenderPolice>
      <LoadingHackernewsArticles delay={5_000} />
    </RenderPolice>
  </main>
);
