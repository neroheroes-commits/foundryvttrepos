import { systemFolder } from "../../../constants.mjs";

export class RTActorSheet extends ActorSheet 
{    
    /** @override */
    static get defaultOptions() 
    {        
        return foundry.utils.mergeObject(super.defaultOptions, {
            classes: [systemFolder, "sheet", "actor"],
            template: "systems/" + systemFolder + "/src/sheets/templates/actors/actor-character-sheet.hbs",
            width: 900,
            height: 700,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "features" }]
        });
    }

    /** @override */
    get template() 
    {
        return "systems/" + systemFolder + "/src/sheets/templates/actors/actor-character-sheet.hbs";
    }

    /** @override */
    getData() 
    {
        // Retrieve the data structure from the base sheet. You can inspect or log
        // the context variable to see the structure, but some key properties for
        // sheets are the actor object, the data object, whether or not it's
        // editable, the items array, and the effects array.
        const context = super.getData();

        // Use a safe clone of the actor data for further operations.
        const actorData = context.data;

        // Add the actor's data to context.data for easier access, as well as flags.
        context.system = actorData.system;
        context.flags = actorData.flags;

        // Prepare character derived data.
        if(actorData.type == "character")
        {
           /* this._prepareCharacterData(context);
            this._prepareCharacterItems(context);
            
            // This has to always happen last, just to be sure.
            this._reRenderItemSheets(context);*/
        }

        // Return the context.
        return context;
    }

    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {jQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html) 
    {
        super.activateListeners(html);

        // The attributes can be rolled.
        html.on('click', '.rollable', this._onRoll.bind(this));

        // Render the item sheet for viewing/editing.
        html.on('click', '.item-edit', (ev) => {
            const li = $(ev.currentTarget).parents('.item');
            const item = this.actor.items.get(li.data('itemId'));
            item.sheet.render(true);
        });

        // Handle the ability to delete items from lists.
        html.on('click', '.item-delete', (ev) => {
            const li = $(ev.currentTarget).parents('.item');
            const item = this.actor.items.get(li.data('itemId'));
            item.delete();
            li.slideUp(200, () => this.render(false));
        });
    }
    
    /**
     * Handle mouse click events for character sheet actions
     * @param {MouseEvent} event    The originating click event
     * @private
     */
    _onSheetAction(event) 
    {
        event.preventDefault();
        const button = event.currentTarget;
        switch( button.dataset.action ) 
        {
            case "rollInitiative":
                return this.actor.rollInitiative({createCombatants: true});
        }
    }

    /**
    * Prepare Character type specific data
    */
    _prepareCharacterData(context) 
    {
        // Nothing.
    }

    /**
    * Prepare Item type specific data
    */
    _prepareCharacterItems(context) 
    {
        // Store the properties locally for easier access.
        const actorData = context.actor;
        const systemData = context.system;

        // Check the Shadowrun 3 Actor Sheet when this becomes necessary.
    }

    /**
    * Check the actor's items list and re-render any open item sheets.
    */
    _reRenderItemSheets(context)
    {
        // TODO: Uncomment when items are available on characters.
        // Iterate through all the items on the character.
        //for(let item of context.actor.items)
            // If this item's sheet is currently opened, it should be re-rendered.
        //    if(item.sheet.rendered)
        //        item.sheet.render();
    }

    /**
    * Handle clickable rolls.
    * @param {Event} event   The originating click event
    * @private
    */
    _onRoll(event) 
    {
        event.preventDefault();
        const element = event.currentTarget;
        const dataset = element.dataset;        

        // Handle item rolls.
        if(dataset.rollType) 
        {
            // Check the Shadowrun 3 Actor Sheet when this becomes relevant.
        }

        // Handle rolls that supply the formula directly.
        if(dataset.roll)
        {
            // Check the Shadowrun 3 Actor Sheet when this becomes relevant.
        }
    }
}

