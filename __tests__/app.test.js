const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('booty-or-death routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });
  it('should be able to get a prompt and 2 options', async () => {
    const res = await request(app).get('/api/v1/prompts/');
    const expected = await Model.getById(1);
    expect(res.body).toEqual(expected);
  });

  it('should take user selection and return a new prompt with options', async () => {
    const res = await request(app).get('/api/v1/prompts/').send();
  });
});
