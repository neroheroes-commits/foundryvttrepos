// Import the system name from the constants file.
import { systemFolder } from "../../../constants.mjs";

// Import each set of item handler functions.
import * as RTSkill from "./type_handlers/rtSkill.mjs";
import * as RTTalent from "./type_handlers/rtTalent.mjs";
import * as RTTrait from "./type_handlers/rtTrait.mjs";

export class RTItemSheet extends ItemSheet
{    
    // Class variable for holding all the item handlers.
    handlers = {
        "skill": RTSkill,
        "talent": RTTalent,
        "trait": RTTrait
    };

    /** @override */
    static get defaultOptions()
    {        
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [systemFolder, "sheet", "item"],
            template: "systems/" + systemFolder + "/src/sheets/templates/items/item-sheet.hbs",
            width: 710,
            height: 600,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "description" }]
        });
    }

    /** @override */
    get template() 
    {
        const path = "systems/" + systemFolder + "/src/sheets/templates/items/";

        return path + "item-" + this.item.type + "-sheet.hbs";
    }

    /** @override */
    getData() 
    {
        // Retrieve the data structure from the base sheet. You can inspect or log
        // the context variable to see the structure, but some key properties for
        // sheets are the actor object, the data object, whether or not it's
        // editable, the items array, and the effects array.
        const context = super.getData();

        // Use a safe clone of the item data for further operations.
        const itemData = context.data;

        // Store some properties in the context for later use.
        context.system = itemData.system;
        context.flags = itemData.flags;

        // Add the selector options from the global config to the context.
        //context.selectors = CONFIG.ROGUETRADER.selectorConfigs;
        
        // TODO: Remove this if statement when the item types are all handled.
        if(itemData.type === "skill" || itemData.type === "talent" || itemData.type === "trait")
        {
            // Deterministically run the appropriate item handler function.
            this.handlers[itemData.type].handler(context, this);
        }

        return context;
    }

    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {jQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html)
    {
        super.activateListeners(html);

        const context = super.getData();

        // We only listen for toggles on item sheets which have them.
        if(context.data.type === "skill" || context.data.type === "talent")
            html.find('.toggle-switch').click(this._onClickToggle.bind(this))
    }

    /**
     * This function is called whenever one of the toggle-switch CSS classes is clicked.
     * @param {Event} event 
     */
    async _onClickToggle (event) 
    {
        event.preventDefault()
        const property = event.currentTarget.closest('.toggle-switch').dataset.property;

        // Retrieve the item's context for future use.
        const context = super.getData();
        const itemData = context.data.system;

        // Change the value of the named property. For a boolean, it sets it to true/false.
        // For a value, it switches it to the appropriate on integer.
        await this.item.toggle(property);

        // We need to ensure the sheet is re-rendered whenever this change is actually made.
        if(this.rendered)
            this.render();
    }
}