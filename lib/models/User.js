const pool = require('../utils/pool');

module.exports = class User {
  id;
  username;

  constructor(row) {
    this.id = row.id;
    this.username = row.username;
  }

  static insert(username) {
    return pool
      .query(
        `
        INSERT INTO
            users(username)
        VALUES
            ($1)
        RETURNING
            *
        `,
        [username]
      )
      .then(({ rows }) => new User(rows[0]));
  }
};
