# Flipped tasks

## Tasks REST API

- Create Tasks API with filesystem storage.
- Try to use the previous code for operating on tasks within the filesystem.
- Test using Postman or any other HTTP client.

### Example data

```js
const tasks = [
  { id: "0", text: "Learn HTML and CSS", completed: true },
  { id: "1", text: "Get good at JavaScript", completed: true },
  { id: "2", text: "Master React", completed: false },
  { id: "3", text: "Discover Redux", completed: false },
  { id: "4", text: "Build amazing apps", completed: false },
  { id: "5", text: "Hello from Node.js 👋", completed: false },
];
```

## Extras

- `[Optional]:` Create minimal Frontend for the application.

- `[Optional]:` Add logging to file.

- `[Experiment]:` Use a different file format for storing tasks (e.g. CSV).

- `[Challenge]:` Add ENV variable API_KEY with some random value.
  Secure the endpoints to require passing the API_KEY in request Headers.
