
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

    (7, 'A storm''s a-brewing as you''re relaxing below deck. Unfortunately the poor lad who was doing your chores gets thrown overboard.', 'dive in after them', 'while everyone is distracted, pick the lock to the captain''s cabins', 13, 14, false),

    (13, 'Death', 'replay', 'quit', 0, 0, true),

    (14, 'That scurvy dog! You find the supplies the Captain has been hoarding from the crew...', 'secretly distribute to the crew', 'call for a mutiny', 21, 22, false), 

    (21, 'The crew is aghast at the Captain''s impertinence and might be more on your side...if they weren''t so desperate for rations. A fight breaks out as you''re trying to distribute the food evenly...', 'give your share of oranges to calm the tides', 'draw your blade', 26, 27, true), 

    (27, 'A cry to "Walk the plank!" goes out and you''re forced to the ship''s edge with your hands tied behind your back. How are you going to get out of this one? Hope you''re good at swimming with your legs.', 'replay', 'quit', 0, 0, false),

    (22, 'Death', 'replay', 'quit', 0, 0, false),


    (23, 'end game5', 'replay', 'quit', 0, 0, null),
    (24, 'end game4', 'replay', 'quit', 0, 0, null),
    (25, 'end game3', 'replay', 'quit', 0, 0, null),
    (26, 'end game2', 'replay', 'quit', 0, 0, null),
    (27, 'end game1', 'replay', 'quit', 0, 0, null);

INSERT INTO
    users (username)
VALUES
    ('default');