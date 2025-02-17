import { useEffect, useState } from "react";
import { useCounter } from "./useCounter";

const PLACEHOLDER_API_URL = "https://jsonplaceholder.typicode.com/users";

const logThrough = (data) => {
  console.log(data);
  return data;
};

const RenderPolice = ({ children, shouldRender = false }) => {
  const [isRendering, setIsRendering] = useState(shouldRender);

  const toggle = () => setIsRendering((p) => !p);

  const buttonText = isRendering ? "Unmount component" : "Mount component";
  const cls = isRendering ? "red" : "green";
  const style = { display: "block" };

  return (
    <>
      <button className={cls} style={style} type="button" onClick={toggle}>
        {buttonText}
      </button>

      {isRendering ? children : null}
    </>
  );
};

const NaiveWay = () => {
  const [users, setUsers] = useState([]);

  const [counter, bumpCounter] = useCounter(0);
  console.log(counter);

  fetch(PLACEHOLDER_API_URL)
    .then((data) => data.json())
    .then(logThrough)
    .then(setUsers)
    .catch(console.error)
    .finally(bumpCounter);

  return (
    <section className="border">
      <h2>Naive Way ({counter})</h2>

      <ol>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ol>
    </section>
  );
};

const ProperWay = () => {
  const [users, setUsers] = useState([]);

  const [counter, bumpCounter] = useCounter(0);
  console.log(counter);

  useEffect(() => {
    fetch(PLACEHOLDER_API_URL)
      .then((data) => data.json())
      .then(logThrough)
      .then(setUsers)
      .catch(console.error)
      .finally(bumpCounter);
  }, []); /* Don't put `users` here - Rerender Loop */

  return (
    <section className="border">
      <h2>Proper Way ({counter})</h2>

      <ol>
        {users.map((users) => (
          <li key={users.id}>{users.name}</li>
        ))}
      </ol>
    </section>
  );
};

const get = (url, options = {}) =>
  fetch(url, options)
    .then((response) => response.json())
    .then(logThrough)
    .catch(console.error);

const mapArticles = (data) => {
  return data.hits.map((article) => ({
    id: article.objectID,
    title: article.title,
  }));
};

const sleep = async (ms = 1_000) => new Promise((r) => setTimeout(r, ms));

const HACKERNEWS_API_URL = "https://hn.algolia.com/api/v1/search?query=react";

const HackernewsArticles = () => {
  const [articles, setArticles] = useState([]);

  console.log("Hackernews Articles:", articles);

  useEffect(() => {
    /* Callbacks */
    sleep(3_000).then(() =>
      get(HACKERNEWS_API_URL).then(mapArticles).then(setArticles)
    );

    /* Async function */
    // const fetchArticles = async () => {
    //   await sleep(5_000);
    //   const data = await get(HACKERNEWS_API_URL);
    //   const mappedArticles = mapArticles(data);
    //   setArticles(mappedArticles);
    // };
    // fetchArticles();
    // /* IIFE */
    // (async () => {
    //   await sleep(5_000);
    //   const data = await get(HACKERNEWS_API_URL);
    //   const mappedArticles = mapArticles(data);
    //   setArticles(mappedArticles);
    // })();
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

export const FetchingData = () => (
  <main className="col wide-gap">
    <h1>Fetching Data</h1>

    <RenderPolice>
      <NaiveWay />
    </RenderPolice>

    {/* <RenderPolice shouldRender>
      <ProperWay />
    </RenderPolice> */}

    {/* <RenderPolice shouldRender={false}>
      <HackernewsArticles />
    </RenderPolice> */}
  </main>
);
