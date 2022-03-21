const request =  require('supertest')
const app = require('./app.js')
jest.mock('./db', () => {
  return {
    getPlayers: (a,b) => b
  }
});

describe("POST /users", () => {
    describe("Signup", () => {
        test("It should do something", () => {
            return request(app)
              .post("/rpg")
              .send({"text": "list"})
              .expect(200, "hello")
          });
    })
  })