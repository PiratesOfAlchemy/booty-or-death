const pool = require('../utils/pool');

// get user plots

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

  static async getSumByUserId(id) {
    const res = await pool.query(
      `
      SELECT 
      SUM(CASE WHEN was_heroic THEN 1 ELSE 0 END) AS was_heroic 
      
      FROM
        users
      
      LEFT JOIN
        user_plot
      ON
        user_plot.user_id = users.id
      WHERE
        users.id = $1
      `,
      [id]
    );
    return res.rows[0].was_heroic;
      
  }

};
