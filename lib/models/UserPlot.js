const pool = require('../utils/pool');

module.exports = class UserPlot {
  id;
  blockId;
  userId;
  wasHeroic;

  constructor(row) {
    this.id = row.id;
    this.blockId = row.block_id;
    this.userId = row.user_id;
    this.wasHeroic = row.was_heroic;
  }

  static insert({ blockId, wasHeroic, userId }) {
    return pool.query(
      `
      INSERT INTO
        user_plot (block_id, was_heroic, user_id)
      VALUES
        ($1, $2, $3)
      RETURNING
        *
      `,
      [blockId, wasHeroic, userId]
    )
      .then(({ rows }) => new UserPlot(rows[0]));
  }

};
