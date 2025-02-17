export const HttpClient = {
  async get(url, options = {}) {
    const response = await fetch(url, options); // AbortController.signal.

    if (!response.ok) {
      throw new Error(
        `Response was not OK. Status: ${response.status} ${response.statusText}`
      );
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      const data = await response.json();
      return data;
    }

    const data = await response.text();
    return data;
  },
};
