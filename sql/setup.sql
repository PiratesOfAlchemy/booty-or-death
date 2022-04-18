
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

    (5, "The British are coming! You're unprepared and understocked.", 'raise the white flag', 'fire on them with all you have!', 10, 11, false),

    (10, 'The British are boarding your ship and will be taking everyone captive and return them to England to face penalty for their crimes. You...', 'try to convince them to leave', 'try to convince them to leave', 17, 18, true),

    (11, 'Nice try, but the mighty Drunken Sea Dragon is sunk. Not a GREATEST first day as a pirate. Hope you learned how to swim.', 'replay', 'quit', 0, 0, null),

    (17, 'You only have moments to think of a plan to scare them off your ship...', 'convince them the ship is haunted', 'spew bodily fluids all over the place', 24, 25, true),

    (18, "You're easily outnumbered and the majority of the crew is killed while the most handy are gathered up and forced to board the British ship. That night you find a way to break out of the brig and...", 'take a rowboat and the remainder of your crew and hope you reach land soon', 'hide away in crate and hope to escape when ship next dock', 25, 26, false),

    (25, "As your reward for surviving as pirate, you're now the proud owner of a beautiful feather to start creating a replica of Captain White Stache's marvelous hat that you've been eye-balling since join The Drunken Sea Dragon.", 'replay', 'quit', 0, 0, null),

    (26, "Drat! You've contracted skurvy and the worst news? The teeth don't go back in! And you might be losing what's left of your friends, too. Best find ya some oranges, quick as ye can!", 'replay', 'quit', 0, 0, null),
    (7, 'A storm''s a-brewing as you''re relaxing below deck. Unfortunately the poor lad who was doing your chores gets thrown overboard.', 'dive in after them', 'while everyone is distracted, pick the lock to the captain''s cabins', 13, 14, false),

    (13, 'Death', 'replay', 'quit', 0, 0, true),

    (14, 'That scurvy dog! You find the supplies the Captain has been hoarding from the crew...', 'secretly distribute to the crew', 'call for a mutiny', 21, 22, false), 

    (21, 'The crew is aghast at the Captain''s impertinence and might be more on your side...if they weren''t so desperate for rations. A fight breaks out as you''re trying to distribute the food evenly...', 'give your share of oranges to calm the tides', 'draw your blade', 26, 27, true), 

    (27, 'A cry to "Walk the plank!" goes out and you''re forced to the ship''s edge with your hands tied behind your back. How are you going to get out of this one? Hope you''re good at swimming with your legs.', 'replay', 'quit', 0, 0, false),

    (22, 'Death', 'replay', 'quit', 0, 0, false),

    (4, 'While keeping lookout, you see a ship in the distance that is gaining on you fast. You call out the alarm! Shots are fired and you split the other ship''s mast in half. As you swing aboard the enemy''s ship, do you...', 'try to gather all the enemy crew while the pillaging begins', 'lead the raid with gusto!', 8, 9, true),

    (8, 'With the majority of the crew alive, you''re able to hear a very interesting tidbit of information. Seems they''ve been hoarding the map to the fearsome Blackbeard''s vast treasures.', 'tell the captain', 'confiscator it for yourself', 15, 16, true),

    (9, 'Give no quarter! You fight violently and enthusiastically, but soon find yourself outmatched by the more seasoned pirates and find yourself run through. The worst bit? The bloody mate''s name is Jeff. You were bested by Jeff.', 'replay', 'quit', 0, 0, false),

    (15, 'Captain White Stache is impressed by your loyalty to him and the crew, and has you lead a landing party to the marked island. By the time you make land, your mates are exhausted and crotchety. You can...', 'rally your mates and fight your way through the forest', 'let them fight it out while you nap in this lovely clearing', 23, 24, true),

    (16, 'You steal a rowboat and make it to the island just before your limited supplies run out. As you scour the island in search of food, you come across a sad little bedraggled parrot, quite literally on their last leg...', 'offer the poor bird the last of your food', 'eat the bird', 24, 25, false),

    (23, 'You''ve found the infamous Blackbeard''s treasure!! It''s now up to you how ye see fit to split it amongst the crew.', 'replay', 'quit', 0, 0, null),
    
    (24, 'You''re reward with the best booty (aside treasure itself, a''course), a one-legged parrot name Walki-Talki. And tied around his leg is a fashionable pearl necklace, yours to do with as you wish', 'replay', 'quit', 0, 0, null);

INSERT INTO
    users (username)
VALUES
    ('default');