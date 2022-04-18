
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

    (4, 'While keeping lookout, you see a ship in the distance that is gaining on you fast. You call out the alarm! Shots are fired and you split the other ship''s mast in half. As you swing aboard the enemy''s ship, do you...', 'try to gather all the enemy crew while the pillaging begins', 'lead the raid with gusto!', 8, 9, true),

    (8, 'With the majority of the crew alive, you''re able to hear a very interesting tidbit of information. Seems they''ve been hoarding the map to the fearsome Blackbeard''s vast treasures.', 'tell the captain', 'confiscator it for yourself', 15, 16, true),

    (9, 'Give no quarter! You fight violently and enthusiastically, but soon find yourself outmatched by the more seasoned pirates and find yourself run through. The worst bit? The bloody mate''s name is Jeff. You were bested by Jeff.', 'replay', 'quit', 0, 0, false),

    (15, 'Captain White Stache is impressed by your loyalty to him and the crew, and has you lead a landing party to the marked island. By the time you make land, your mates are exhausted and crotchety. You can...', 'rally your mates and fight your way through the forest', 'let them fight it out while you nap in this lovely clearing', 23, 24, true),

    (16, 'You steal a rowboat and make it to the island just before your limited supplies run out. As you scour the island in search of food, you come across a sad little bedraggled parrot, quite literally on their last leg...', 'offer the poor bird the last of your food', 'eat the bird', 24, 25, false),

    (23, 'You''ve found the infamous Blackbeard''s treasure!! It''s now up to you how ye see fit to split it amongst the crew.', 'replay', 'quit', 0, 0, null),
    
    (24, 'You''re reward with the best booty (aside treasure itself, a''course), a one-legged parrot name Walki-Talki. And tied around his leg is a fashionable pearl necklace, yours to do with as you wish', 'replay', 'quit', 0, 0, null),

INSERT INTO
    users (username)
VALUES
    ('default');