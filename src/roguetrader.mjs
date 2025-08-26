// Import the system directory name.
import { systemFolder } from "./constants.mjs";

// Import the Actor and ActorSheet for Rogue Trader.
import { RTActor } from "./sheets/scripts/actors/rtActor.mjs";
import { RTActorSheet } from "./sheets/scripts/actors/rtActorSheet.mjs";

// Impoort the Item and ItemSheet for Rogue Trader.
import { RTItem } from "./sheets/scripts/items/rtItem.mjs";
import { RTItemSheet } from "./sheets/scripts/items/rtItemSheet.mjs";

// Import Custom Handlebar Templates.
import { preloadHandlebarsTemplates } from "./sheets/scripts/handlebars/templates.mjs";

// Import the system configuration object.
import { ROGUETRADER } from "./config.mjs";

/*
 *  Main system initialization function.
 */
Hooks.once("init", function()
{
    // Create a global space system object for easy access.
    game.roguetraderdev = {
        RTActor,
        RTItem
    };

    // Set the base initiative calculation for the system.
    CONFIG.Combat.initiative = {
        formula: "(@characteristics.agility.value) + 1d10",
        decimals: 0
    };

    // Define the custom document classes for Actors and Items.
    CONFIG.Actor.documentClass = RTActor;
    CONFIG.Item.documentClass = RTItem;

    // TODO: Figure out what this actually means.
    // Active Effects are never copied to the Actor,
    // but will still apply to the Actor from within the Item
    // if the transfer property on the Active Effect is true.
    CONFIG.ActiveEffect.legacyTransferral = false;

    // Add the system config object to the global config.
    CONFIG.ROGUETRADER = ROGUETRADER;

    console.log("ROGUE TRADER | Registering the Rogue Trader Actor Sheets.");

    // Unregister the default/core ActorSheet.
    Actors.unregisterSheet("core", ActorSheet);

    // Register the RTActorSheet as the new default sheet.
    Actors.registerSheet(systemFolder, RTActorSheet, {
        makeDefault: true,
    });

    // Unregister the default/core ItemSheet.
    Items.unregisterSheet('core', ItemSheet);

    // Register the SR3ItemSheet as the new default sheet.
    Items.registerSheet(systemFolder, RTItemSheet, {
        makeDefault: true,  
    });

    // Confirm that the actor/item sheets were loaded successfully.
    console.log("ROGUE TRADER | Sheets Registered Successfully");

    // Preload Handlebars templates.
    return preloadHandlebarsTemplates();
});