const request = require('supertest')
const db = require('./db')

jest.mock('./db')
db.getPlayers.mockImplementation((req, res) => {
  const mock_response = {
    response_type: 'in_channel',
    text: 'The humble explorers',
    attachments: [{ text: 'ghost, Level 1' }]
  }
  return res.send(mock_response)
});

const app = require('./app.js')

describe("POST /rpg", () => {
  describe("list", () => {
    const mock_response = {
      response_type: 'in_channel',
      text: 'The humble explorers',
      attachments: [{ text: 'ghost, Level 1' }]
    }

    test("It should response with a list of users", () => {
      return request(app)
        .post("/rpg")
        .send({ "text": "list" })
        .expect(200, mock_response)
    });
  })
})