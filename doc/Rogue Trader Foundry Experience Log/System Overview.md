The system needs some features and I can add them here as a pseudo-roadmap. No guarantees on order, despite the fact that I'll inherently have an order to them.

## Starting State

The sheet started out from a baseline copy of my Shadowrun 3 system with all the system-specific stuff removed. This just let me include the `template.json`, `system.json`, `config.json`, and `templates.mjs` files (with some modifications) to make the system "just go".

## Phase 1

I largely just want to build the system while trying out some different methods for handling data/UI so I might be able to apply those ideas to the Shadowrun 3 system. It turns out that Shadowrun 3 is a far more complicated system and so it seems like the new things I'm trying won't be very useful. Alas, I'll keep going here and see what I end up with.

This list will be very different from Shadowrun 3, as I already know how to do a lot of the baseline functionality, even if it's not anywhere near optimal.

Because they're similar systems, I used the Call of Cthulhu 7th Edition system as an inspiration for how to build Rogue Trader. There will probably be lots of similarities.

1. Figure out how to create UI toggles, similar to CoC7. (complete)
2. Create the `skill` item type with all the required data fields. Treat the base item sheet as a builder sheet. (complete)
3. Add all of the skills to the game.
4. Create a summary item sheet for purposes of viewing the built information. I don't yet know how to trigger this from a character sheet instead of the default skill sheet.
5. Create a basic actor sheet that stores a list of all the skills.
6. Create a roll window for making Tests.
	1. Full skill value as "target number" (including bonuses).
		1. Give the option to pick a different characteristic other than the default.
	2. Difficulty slider from -60 to +60 with the correct labels.
		1. Figure out how to make a slider. I think it's a Foundry HTML element.
	3. Roll and Cancel buttons.
7. Trigger the roll window from the actor sheet as appropriate for skills and characteristics.

## Extra TODO List

1. See *Willpower VS Will Power* in [[Important Notes]].
2. Stop using `+` concatenation in strings and switch to `${variable}` notation instead.