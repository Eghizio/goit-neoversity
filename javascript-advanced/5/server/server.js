const http = require("node:http");
const url = require("node:url");

const server = http.createServer((request, response) => {
    /* Logger */
    console.log(`[${request.method}] ${request.url}`);

    /* CORS */
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    response.setHeader("Access-Control-Max-Age", 2_592_000);


    /* Handler */
    const { query, pathname } = url.parse(request.url, true);
    console.log({ query, pathname });

    response.statusCode = query?.status || 404;
    
    // response.write(`{ "hello": "there" }`);
    response.write(JSON.stringify({ "hello": "there" }));

    response.end();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`[${new Date().toLocaleString()}] Server listening on port: ${PORT}`));
