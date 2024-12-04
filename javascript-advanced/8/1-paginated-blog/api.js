import axios from "https://cdn.jsdelivr.net/npm/axios@1.7.2/+esm";
import { cached } from "./cache.js";


const client = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

const get = cached((url, options = {}) => client
    .get(url, options)
    .then(res => res.data));



const getPosts = (options) => get("/posts", options);

const getUser = (userId, options) => get(`/users/${userId}`, options);

const getPostsPage = (_page = 1) => getPosts({
    params: {
        _page,
        _limit: 5,
    }
});


export const Api = {
    getUser,
    getPostsPage,
};
