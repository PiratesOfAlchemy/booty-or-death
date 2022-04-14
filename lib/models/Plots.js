const pool = require('../utils/pool');

module.exports = class Plot {
  id;
  prompt;
  heroicChoice;
  villainousChoice;
  heroicBlockId;
  villainousBlockId;
  isHeroic;

  constructor(row) {
    this.id = row.id;
    this.prompt = row.prompt;
    this.heroicChoice = row.heroic_choice;
    this.villainousChoice = row.villainous_choice;
    this.heroicBlockId = row.heroic_block_id;
    this.villainousBlockId = row.villainous_block_id;
    this.isHeroic = row.is_heroic;
  }

  static getAll() {
    return pool.query(
      `
      SELECT
        *
      FROM
        plot
      `
    )
      .then(({ rows }) => rows.map((row) => new Plot(row)));
  }

  static getById(id) {
    return pool.query(
      `
      SELECT
        *
      FROM
        plot
      WHERE
        id=$1
      `, 
      [id]
    )
      .then(({ rows }) => new Plot(rows[0]));
  }

};
