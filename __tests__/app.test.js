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
  it.only('should be able to get a prompt and two options by id', async () => {
    const res = await request(app).get('/api/v1/plots/1');
    const expected = {
      prompt: 'prompt 1',
      heroicChoice: 'good',
      villainousChoice: 'bad',
    };
    expect(res.body).toEqual(expected);
  });
});
