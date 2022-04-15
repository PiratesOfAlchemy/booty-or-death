DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_plot CASCADE;
DROP TABLE IF EXISTS plot CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL
);

CREATE TABLE plot (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prompt TEXT NOT NULL,
    heroic_choice TEXT NOT NULL,
    villainous_choice TEXT NOT NULL,
    heroic_block_id BIGINT,
    villainous_block_id BIGINT,
    is_heroic BOOLEAN
);

CREATE TABLE user_plot (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    block_id BIGINT REFERENCES plot(id),
    user_id BIGINT REFERENCES users(id),
    was_hero BOOLEAN
);

INSERT INTO 
    plot (prompt, heroic_choice, villainous_choice, heroic_block_id, villainous_block_id, is_heroic)
VALUES 
    ('prompt 1', 'good', 'bad', 2, 3, null),
    ('prompt 2', 'good', 'bad', 4, 5, true),
    ('prompt 3', 'good', 'bad', 6, 7, false);

INSERT INTO
    users (username)
VALUES
    ('default');