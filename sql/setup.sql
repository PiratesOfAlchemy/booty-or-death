
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS user_plot CASCADE;
DROP TABLE IF EXISTS plot CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username TEXT NOT NULL
);

CREATE TABLE plot (
    id BIGINT PRIMARY KEY,
    prompt TEXT NOT NULL,
    heroic_choice TEXT NOT NULL,
    villainous_choice TEXT,
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
    plot (id, prompt, heroic_choice, villainous_choice, heroic_block_id, villainous_block_id, is_heroic)
VALUES 
    (1, 'Ahoy matey! Welcome to your first day aboard the mighty Drunken Sea Dragon, captained by the most fearsome pirate of these seven seas, Captain White Stache. Ye''ll want to make an impression your mates as you''ll be living with them for years to come (if ye last that long).', 'bake a delicious peace-offering cake', 'insult the first person you see', 2, 3, null),

    (2, 'Suddenly everyone''s steely eyes have softened and you''re offered some of the Captain''s best rum that''s been pilfered from his cabin. Do you...', 'offer to be lookout for Captain White Stache and his first mate, Teal Steel', 'accept and attempt to drink everyone under the table', 4, 5, true),

    (3, 'You''ve managed to piss off the first mate, Teal Steel and have the honor of swabbing the deck for the next month, as well as any other task he seems fit to give you. Do you...', 'try to impress him with your worth ethic in hopes of getting back on his good side', 'intimidate a crewmate into completing your tasks', 6, 7, false),

    (4, 'prompt 4', 'good', 'bad', 8, 9, true),

    (5, 'prompt 5', 'good', 'bad', 10, 11, false),

    (6, 'Captain tells you of his cousin, the dreaded Blackbeard (who totally stole his look from White Stache, obvs) and mentions a the treasure map he has been saving for a rainy day (it is probably not even REAL, right?).', 'convince him of its plausability', 'try to steal it off him', 12, 27, true),

    (7, 'prompt 7', 'good', 'bad', 13, 14, false),

    (12, 'Captain White Stache has decide to take a chance on you and the hunt for Blackbeards treasure begins, only there is a bit of an issue. You can take the most direct course to get to the treaure as quickly as possible and face the dangerous rocky outcropping surrounding the island. Or take the longer path on the windward side of the island with a chance of relatively safe passage.', 'safety first', 'quick and dirty', 19, 20, true),

    (19, 'You make it to the island without a scratch. You and three of the Captains most trusted crew head ashore and make your way through the treacherous jungle. As night falls you find the map seems to be leading you towards a dark, mysterious cave.  Do you...', 'make camp in a clearing and try again tomorrow', 'continue on and venture into the cave', 24, 25, true),

    (20, 'A storm kicks up and you are bashed against the rocky isles. You are forced to abandon ship! Somehow you make it to shore but you realize half the map is destroyed in the process.', 'barter with the locals for supplies and try to repair the ship', 'continue on and hope to find clues along the way', 25, 26, false),

    (23, 'end game5', 'replay', 'quit', 0, 0, null),
    (24, 'end game4', 'replay', 'quit', 0, 0, null),
    (25, 'end game3', 'replay', 'quit', 0, 0, null),
    (26, 'end game2', 'replay', 'quit', 0, 0, null),
    (27, 'end game1', 'replay', 'quit', 0, 0, null);

INSERT INTO
    users (username)
VALUES
    ('default');