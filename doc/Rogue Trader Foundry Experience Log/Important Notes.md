This is where I will place notes I'd like to remember based on design changes or errors discovered during the creation of the Rogue Trader system.

## Setting the Item and Actor Type Names in Foundry UI

To set the type names so that instead of `skill` showing up in every UI list you will see `Skill` instead, you need to change the `en.json` file in `packs/lang`. There needs to be a `TYPES` JSON in the file and Foundry will load them automatically.

Note that this works for every language defined by your `system.json` file, but I only have English defined, so that's just where it goes.

## Willpower VS Will Power

The books are strangely unclear with how they spell the word Willpower, writing it as one word or two words. While creating all the Talents from the Core Rulebook I decided to check what the characteristic was called in the section on Characteristics. The earliest officially labeled mention of the characteristic appears as one word, seen here on page 14:

![[Pasted image 20250404004858.png]]

As such, moving forward, I am going to convert any mention of "Will Power" into "Willpower" for the sake of consistency. Also, I like it more. 

I've checked all the code and have not found an instance of "Will Power". I changed it in the `template.json` file in the Actor templates, which should automatically migrate in system version `0.0.8`.

As for content, I will need to check the following places for "Will Power" so it can be changed:

1. All skills in the `Rogue Trader Skills` folder in-world.
2. All traits in the `Rogue Trader Traits` folder in-world.
3. All talents up to (but not including) "Jaded" in the `Rogue Trader Talents` folder in-world.

Anything created after this point should be correct.

## Starting Skills, Talents, and Gaining Advancements

This was definitely the most confusing part of the book. When creating a character for the first time, you follow the origin path and end up with a feature from each row, including a career. Once you have all of your features catalogued, I think the most appropriate way to handle skills/talents is to follow this order:

Skills:
1. Add all skills in the game to your character sheet as untrained.
2. Check your career's starting skill list. Anything listed is increased to Trained.
3. Check each of the chosen features from origin path, in any order:
	1. If you *receive a skill*, it's training level increases by one step.
	2. If you *treat an advanced skill as basic*, set it to basic, but don't increase the training level.
	3. If a skill is at Mastery (+20%) and you receive a training increase in it, nothing happens.

Talents:
1. Check your career's starting talent list and add all of those talents to your character sheet.
2. Check each of the chosen features from the origin path, in any order:
	1. If you *receive a talent*, add it to your character's talent list.
	2. If you already have a talent and receive it again, add Talented to your talent list with a talent group of your choice.

Note that there are some irregularities that made this process a bit confusing, as mentioned above. I'll add the points here just to avoid confusion in the future for the reader:

1. As far as I can tell, the book does not appear to ever *explicitly state* that your career's starting skills are trained. It says you "begin with a set of starting skills", but I was initially under the impression that every character already started with every skill; they were simply all untrained.
2. The book goes on to say that when you acquire a skill, you are trained in that skill, but the language about acquiring a skill isn't 100% clear when it comes to what the starting skills really mean, which made me wonder if they were saying that "beginning with a set of starting skills" meant I was technically acquiring them, and thus they're all trained.
3. To muddy the water further, the Rank 1 Advances tables for the careers *include* the starting skills in them with an XP cost, which it shouldn't need to do if you get the starter skills automatically. That was very confusing and made it even harder to understand what was going on with skills. This also almost tricked me into believing that I could keep buying those Rank 1 Advancements for my skills to get to Mastery (+20%), which is not true. That only happens during character creation if you're automatically given training in the same skill from multiple sources.

To try to unmuddy the waters, here's a list of clarifications that makes the whole thing easier to understand:

1. Yes, when it says you begin with starting skills, that's them telling you that you acquire them all and thus are trained in any that are listed in your career's starting skill list. The same goes for starting talents. This is kind of implicit because they're in the same information block as your starting gear, which you obviously begin the game with, but I'm looking for an *explicit* statement. They really dropped the ball on explaining that one part of the character creation and it throws a huge, mysterious wrench into so many parts of the mechanics surrounding it. It's unfortunate because the rest of the book is surprisingly well put together.
2. Advances are not repeatable. I didn't immediately understand this, but it turns out you can only buy each advancement once and that's it. This means most of the Rank 1 Advancements are blocked when you start the game.
3. Based on (1) above, the way they list the Advances is important. For example, if they list a Skill advance it's always in the format of: **Skill** OR **Skill+10** OR **Skill+20**. These advances are literally picking the training level that skill has access to, not actually adding *another* 10 or 20 to whatever you have, where **Skill** is Trained, **Skill+10** is the first Mastery level, and **Skill+20** is the second Mastery level. If your character already has a skill at Mastery (+10%), they can't purchase it again via Advances.
4. Talents operate the same way. You can't purchase the same talent more than once unless there's a multiplier attached to it, like (x2) or (x4). In those cases you can buy them that many times and their effects stack. This usually applies to talents with flat increases to wounds or armour.
5. All of this means the Rank 1 Advances are kind of shitty in some regards, although buying training in skills doubles their rating, which is a big boost. If you get to buy advanced skills in your Rank 1 table, they would *effectively* be double again. You may just want to elect to buy bonuses for your origin path features or characteristic improvements instead. It's up to you.

So why did they do it this way? It turns out that all of the FFG 40K RPGs are technically compatible with each other and the various titles offer ways to take new careers as you gain ranks. That is, instead of increasing your rank by 1 when you hit a rank milestone, you can elect instead to take on a second career at rank 1. 

Suddenly the list of skills being available for purchase in the Rank 1 Advances makes sense. If you started with a career that didn't have cheap access to the new career's skills, you now have an opportunity to buy them from the Rank 1 Advances table. See? It's not crazy. Just poorly presented. 