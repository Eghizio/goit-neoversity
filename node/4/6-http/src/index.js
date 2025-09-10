/*
    # Tasks REST API
    - Create Tasks API with filesystem storage.
    
    - Try to use the previous code for operating on tasks within the filesystem.
    
    - Test using Postman or any other HTTP client.

    # Extras
    - [Optional]: Create minimal Frontend for the application.

    - [Experiment]: Use a different file format for storing tasks (e.g. CSV).
    
    - [Challenge]: Add ENV variable API_KEY with some random value.
    Secure the endpoints to require passing the API_KEY in request Headers.
*/

import path from "node:path";
import express from "express";
import morgan from "morgan";
import { ApiRouter } from "./api.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join("src", "public")));

app.use("/api/v1", ApiRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App available @ http://localhost:${PORT}`));
