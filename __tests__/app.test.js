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

  it('should be able to get a prompt and two options by id', async () => {
    const res = await request(app).get('/api/v1/plots/1');
    const expected = {
      prompt: 'prompt 1',
      heroicChoice: 'good',
      villainousChoice: 'bad',
    };
    expect(res.body).toEqual(expected);
  });

  // it('should be able to insert a user name into users table', async () => {
  //   const res = await request(app)
  //     .post('/api/v1/users')
  //     .send({ username: 'test' });

  //   const expected = {
  //     id: expect.any(String),
  //     username: 'test',
  //   };
  //   expect(res.body).toEqual(expected);
  // });
});

//testing for issues with pushing to alexDev
