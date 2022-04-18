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
    was_heroic BOOLEAN
);

INSERT INTO 
    plot (prompt, heroic_choice, villainous_choice, heroic_block_id, villainous_block_id, is_heroic)
VALUES 
    ('Ahoy matey! Welcome to your first day aboard the mighty Drunken Sea Dragon, captained by the most fearsome pirate of these seven seas, Captain White Stache. Ye''ll want to make an impression your mates as you''ll be living with them for years to come (if ye last that long).', 'bake a delicious peace-offering cake', 'insult the first person you see', 2, 3, null),

    ('Suddenly everyone''s steely eyes have softened and you''re offered some of the Captain''s best rum that''s been pilfered from his cabin. Do you...', ' offer to be lookout for Captain White Stache and his first mate, Teal Steel', 'accept and attempt to drink everyone under the table', 4, 5, true),

    ('You''ve managed to piss off the first mate, Teal Steel and have the honor of swabbing the deck for the next month, as well as any other task he seems fit to give you. Do you...', 'try to impress him with your worth ethic in hopes of getting back on his good side', 'intimidate a crewmate into completing your tasks', 6, 7, false),

    ('prompt 4', 'good', 'bad', 8, 9, true),

    ('prompt 5', 'good', 'bad', 10, 11, false),

    ('prompt 6', 'good', 'bad', 12, 27, true),

    ('prompt 7', 'good', 'bad', 13, 14, false);

INSERT INTO
    users (username)
VALUES
    ('default');