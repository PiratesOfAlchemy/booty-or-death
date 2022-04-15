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

  it('should create new row in user-plot table that gets values from plot table and JOINS users table', async () => {
    // make user and join user_plot.user_id with user.id
    await request(app)
      .post('/api/v1/users')
      .send({ username: 'Salty Dog' });
    
    // get plot by id where heroic is not null
    const plot = await request(app)
      .get('/api/v1/plots/2');

    // from that we'll return all from user plot
    const res = await request(app)
      .post('/api/v1/user_plot')
      .send({
        blockId: plot.id,
        wasHeroic: plot.isHeroic
      });

    const expected =  {
      id: expect.any(String),
      blockId: 2,
      userId: expect.any(String),
      wasHeroic: true
    };

    expect(res.body).toEqual(expected);


  });

  it.skip('should get all rows on user_plot table with the id of 1', async () => {
    // 
  });
});
