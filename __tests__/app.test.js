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

  it('should be able to insert a user name into users table', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ username: 'test' });

    const expected = {
      id: expect.any(String),
      username: 'test',
    };
    expect(res.body).toEqual(expected);
  });

  it('should populate the user-plot table with the players choices and whether or not they are heroic', async () => {
    // make user and join user_plot.user_id with user.id
    await request(app)
      .post('/api/v1/users')
      .send({ username: 'Salty Dog' });
   
    // get plot by id where heroic is not null
    await request(app)
      .get('/api/v1/plots/2');

    // from that we'll return all from user plot
    const res = await request(app)
      .get('/api/v1/user_plot');

    const expected =  {
      id: expect.any(String),
      blockId: 2,
      userId: expect.any(String),
      wasHero: true
    };

    expect(res.body).toEqual(expected);


  });
});
