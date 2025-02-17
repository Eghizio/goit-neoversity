import { simulateError, sleep } from "../utils";
import { HttpClient } from "./HttpClient";

const BASE_URL = "https://hn.algolia.com/api/v1";

export const HackernewsAPI = {
  async getArticlesByTopic(topic) {
    const searchParams = new URLSearchParams({ query: topic });
    const url = `${BASE_URL}/search?${searchParams.toString()}`;

    await sleep(3_000);
    simulateError(0.3);

    return HttpClient.get(url).then(this.mapArticles);
  },
  mapArticles(data) {
    return data.hits.map((article) => {
      return {
        id: article.objectID,
        url: article.url,
        title: article.title,
        createdAt: article.created_at,
        author: article.author,
        stats: {
          points: article.points,
          comments: article.num_comments,
        },
      };
    });
  },
};
