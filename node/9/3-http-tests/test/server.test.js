/* Mimic the project file structure: /src /test */

const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
/* Can be used combined with Jest or node:test */
const request = require("supertest"); /* https://www.npmjs.com/package/supertest */
const { createServer } = require("../src/server.js");

/* Supertest */
// Given
const app = createServer();

// Expect
request(app)
  .get("/user")
  .expect("Content-Type", /json/)
  .expect("Content-Length", "15")
  .expect(200)
  .end((error, res) => {
    if (error) throw error;
  });

/* Supertest + Node Test Runner */
describe("app", () => {
  it("should respond successfully with correct status, headers & body", async () => {
    // Given
    const app = createServer();

    // When
    const response = await request(app).get("/user");

    // Then
    assert.strictEqual(response.statusCode, 200);

    // And
    assert.notEqual(response.body, undefined);
    assert.deepEqual(response.body.name, "Kuba");
  });
});

/* Todo: Supertest + Jest */
