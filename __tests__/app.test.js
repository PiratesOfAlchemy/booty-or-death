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
      id: expect.any(String),
      prompt: 'prompt 1',
      heroicChoice: 'good',
      villainousChoice: 'bad',
      heroicBlockId: res.body.heroicBlockId,
      villainousBlockId: res.body.villainousBlockId,
      isHeroic: null
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
    const user = await request(app)
      .post('/api/v1/users')
      .send({ username: 'Salty Dog' });
    
    // get plot by id where heroic is not null
    const plot = await request(app)
      .get('/api/v1/plots/2');

    // from that we'll return all from user plot
    const res = await request(app)
      .post('/api/v1/user_plots')
      .send({
        blockId: plot.body.id,
        wasHeroic: plot.body.isHeroic,
        userId: user.body.id
      });

    const expected =  {
      id: expect.any(String),
      blockId: plot.body.id,
      userId: expect.any(String),
      wasHeroic: true
    };

    expect(res.body).toEqual(expected);


  });

  it('should get all rows on user_plot table with the id of 1 and sum column was_heroic', async () => {
    const user = await request(app)
      .post('/api/v1/users')
      .send({ username: 'Salty Dog' });

    const plot = await request(app)
      .get('/api/v1/plots/2');

    await request(app)
      .post('/api/v1/user_plots')
      .send({
        blockId: plot.body.id,
        wasHeroic: plot.body.isHeroic,
        userId: user.body.id
      });

    const res = await request(app)
      .get(`/api/v1/user_plots/${user.body.id}`);

    expect(Number(res.text)).toEqual(1);
    
  });
});
