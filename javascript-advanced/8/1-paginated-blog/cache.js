const Cache = new Map();

export const cached = (get) => async (url, options = {}) => {
    const fullUrl = options.params ? url + "?" + new URLSearchParams(options.params).toString() : url;

    if (Cache.has(fullUrl)) return Cache.get(fullUrl);

    const data = await get(url, options);

    Cache.set(fullUrl, data);

    return data;
};
