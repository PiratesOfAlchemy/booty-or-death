
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
    (1, 'Ahoy matey! Welcome to yer first day aboard the mighty Drunken Sea Dragon, captained by the most fearsome pirate of these seven seas, Captain White Stache. Ye''ll want to make an impression your mates as you''ll be living with them for years to come (if ye last that long).', 'bake a delicious peace-offering cake', 'insult the first person you see', 2, 3, null),

    (2, 'Suddenly everyone''s steely eyes have softened and you''re offered some of the Captain''s best rum that''s been pilfered from his cabin. Do you...', 'offer to be lookout for Captain White Stache and his first mate, Teal Steel', 'accept and attempt to drink everyone under the table', 4, 5, true),

    (3, 'You''ve managed to piss off the first mate, Teal Steel and have the honor of swabbing the deck for the next month, as well as any other task he seems fit to give you. Do you...', 'try to impress him with your work ethic in hopes of getting back on his good side', 'intimidate a crewmate into completing your tasks', 6, 7, false),

    (4, 'While keeping lookout, you see a ship in the distance that is gaining on you fast. You call out the alarm! Shots are fired and you split the other ship''s mast in half. As you swing aboard the enemy''s ship, do you...', 'try to gather all the enemy crew while the pillaging begins', 'lead the raid with gusto!', 8, 9, true), 

    (5, 'The British are coming! You''re unprepared and under-munitioned.', 'raise the white flag', 'fire on them with all you have!', 10, 11, false),

    (6, 'Captain tells you of his cousin, the dreaded Blackbeard (who totally stole his look from White Stache, obviously) and mentions the treasure map he''s been saving for a rainy day (it''s probably not even REAL, right?).', 'convince him of it''s plausability', 'try to steal it off him', 12, 27, true),

    (7, 'A storm''s a-brewing as you''re relaxing below deck. Unfortunately the poor lad who was doing your chores gets thrown overboard.', 'dive in after them', 'while everyone is distracted, pick the lock to the captain''s cabins', 13, 14, false),

    (8, 'With the majority of the crew alive, you''re able to hear a very interesting tidbit of information. Seems they''ve been hoarding the map to the fearsome Blackbeard''s vast treasures.', 'tell the captain', 'confiscator it for yourself', 15, 16, true),

    (9, 'Give no quarter! You fight violently and enthusiastically, but soon find yourself outmatched by the more seasoned pirates and you''re run through. The worst bit? The bloody mate''s name is Jeff. You were bested by Jeff.', 'replay', 'quit', 0, 0, null),

    (10, 'The British are boarding your ship and will be taking everyone captive and returning them to England to face penalty for their crimes. You...', 'try to convince them to leave', 'try to take them all on', 17, 18, true),

    (11, 'Nice try, but the mighty Drunken Sea Dragon is sunk. Not the GREATEST first day as a pirate. Hope you learned how to swim.', 'replay', 'quit', 0, 28, null),

    (12, 'Captain White Stache has decide to take a chance on you and the hunt for Blackbeard''s treasure begins, only there''s a bit of an issue. You can take the most direct course to get to the treaure as quickly as possible and face the dangerous rocky outcropping surrounding the island. Or take the longer path on the windward side of the island with a chance of relatively safe passage.', 'safety first', 'quick and dirty', 19, 20, true),

    (13, 'You give it your most valiant effort but die in shark-infested waters. Life be like that sometimes. Maybe you should''ve built more karma up sooner, and you would''ve had better luck.', 'replay', 'quit', 0, 0, null),

    (14, 'That scurvy dog! You find the supplies the Captain has been hoarding from the crew...', 'secretly distribute to your mates', 'call for a mutiny', 21, 22, false), 

    (15, 'Captain White Stache is impressed by your loyalty to him and the crew, {NAME}. He has you lead a landing party to the marked island. By the time you make land, your mates are exhausted and crotchety. You can...', 'rally your mates and fight your way through the forest', 'let them fight it out while you nap in this lovely clearing', 23, 24, true),

    (16, 'You steal a rowboat and make it to the island just before your limited supplies run out. As you scour the island in search of food, you come across a sad little bedraggled parrot, quite literally on their last leg...', 'offer the poor bird the last of your food', 'eat the bird', 24, 25, false),

    (17, 'You only have moments to think of a plan to scare the British officers off your ship...', 'convince them the ship is haunted', 'spew bodily fluids all over the place', 24, 25, true),

    (18, 'You''re easily outnumbered and the majority of the crew is killed while the most handy are gathered up and forced to board the British ship. That night you find a way to break out of the brig and...', 'take a rowboat and the remainder of your crew and hope you reach land soon', 'hide away in crate and hope to escape when the ship next docks', 25, 26, false),

    (19, 'You make it to the island without a scratch. You and three of the Captain''s most trusted crew head ashore and make your way through the treacherous jungle. As night falls you find the map seems to be leading you towards a dark, mysterious cave.  Do you...', 'make camp in a clearing and try again tomorrow', 'continue on and venture into the cave', 24, 25, true),

    (20, 'A storm kicks up and you''re bashed against the rocky isles. You''re forced to abandon ship! Somehow you make it to shore but you realize half the map is destroyed in the process.', 'barter with the locals for supplies and try to repair the ship', 'continue on and hope to find clues along the way', 25, 26, false),

    (21, 'The crew is aghast at the Captain''s impertinence and might be more on your side...if they weren''t so desperate for rations. A fight breaks out as you''re trying to distribute the food evenly...', 'give your share of oranges to calm the tides', 'draw your blade', 26, 27, true),

    (22, 'Surprise! {NAME}, you are hated by everyone on the ship and they aren''t into your idea of mutiny-ing their precious captain.', 'replay', 'quit', 0, 0, null),

    (23, 'You''ve found the infamous Blackbeard''s treasure!! It''s now up to you how ye see fit to split it amongst the crew.', 'replay', 'quit', 0, 0, null),
    
    (24, 'You''re rewarded with the best booty (aside treasure itself, a''course); a one-legged parrot name Walki-Talki. And tied around him is a fashionable pearl necklace, yours to do with as you wish', 'replay', 'quit', 0, 0, null),

    (25, 'As your reward for surviving as pirate, you''re now the proud owner of a beautiful feather to start creating a replica of Captain White Stache''s marvelous hat that you''ve been eye-balling since joining The Drunken Sea Dragon.', 'replay', 'quit', 0, 0, null),

    (26, 'Drat! You''ve contracted skurvy and the worst news? The teeth don''t go back in! And you might be losing what''s left of your friends, too. Best find ya some oranges, quick as ye can!', 'replay', 'quit', 0, 0, null),

    (27, 'A cry to ''Walk the plank!'' goes out and you''re forced to the ship''s edge with your hands tied behind your back. How are you going to get out of this one? Hope you''re good at swimming with just your legs.', 'replay', 'quit', 0, 0, null),

    (28, 'You''re in luck! Their captain is quite the scallywag and surrenders immediately. As your mates scour the ship for their miniscule booty, the Captain begs you to spare their lives.', 'give quarter and leave with your booty', ' sink the ship with them onboard', 24, 25, false),

    (29, 'Your mates have incredible marksmanship and you manage to sink their ship in only four shots, allowing you time to make your escape. Your ship has taken major damage though, and you''re forced to dock at the first opportunity.', ' only buy precisely what you need to repair the ship/restock supplies', 'spend all your money on a treasure map and hope for a grand reward', 25, 26, false),

    (30, 'The crew is rightfully enraged and support your call for mutiny. Congratulations! You''re now the captain of The Drunken Sea Dragon and it''s up to you what to do with the scallywag, White Stache.', 'maroon him on an island','toss him to the sharks', 31, 32, false),

    (31, 'Just your luck, as you''re deserting White Stache, you spot something gleaming in a distant cove. It''s Blackbeard''s famous treasure and one day in you are the richest Captain alive.', 'replay', 'quit', 0, 0, null),

    (32, 'As White Stache is sinking to the bottom of the sea, you realize Blackbeard''s infamous treasure map was in his pocket and is now lost forever. At least you get to keep his booty??', 'replay', 'quit', 0, 0, null);

INSERT INTO
    users (username)
VALUES
    ('default');
