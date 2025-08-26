import { systemFolder } from "../../../constants.mjs";

export class RTItem extends Item
{
    /**
     * Augment the basic Item data model with additional dynamic data.
     */
    prepareData() 
    {
        super.prepareData();
    }
    
    /** 
     * @override 
     */
    prepareBaseData() 
    {
        const itemData = this;
        const systemData = itemData.system;

        switch(itemData.type)
        {
            case "skill":
                console.log("ROGUE TRADER | Item.prepareBaseData switch resolved to Skill type.")
                break;
            case "talent":
                console.log("ROGUE TRADER | Item.prepareBaseData switch resolved to Talent type.")
                itemData.img = "systems/" + systemFolder + "/src/images/icons/talent.svg";
                systemData.information.source.book = systemData.information.source.book || "Rogue Trader Core Rulebook";
                break;
            case "trait":
                console.log("ROGUE TRADER | Item.prepareBaseData switch resolved to Trait type.")
                itemData.img = "systems/" + systemFolder + "/src/images/icons/trait.svg";
                break;
            default:
                console.log("ROGUE TRADER | Item.prepareBaseData switch could not resolve to the type '" + itemData.type + "'.");
        };
    }

    /**
     * @override
     */
    prepareDerivedData() 
    {
        const itemData = this;
        const systemData = itemData.system;

        switch(itemData.type)
        {
            case "skill":
                systemData.information.display_name = itemData.name + (systemData.group.enabled && " ("+systemData.group.group_name+")" || "");
                break;
            case "talent":
            case "trait":
                systemData.information.display_name = itemData.name;
                break;
            default:
                console.log("ROGUE TRADER | Item.prepareDerivedData switch could not resolve to the type '" + itemData.type + "'.");
        };
    }

    /**
     * Prepare a data object which is passed to any Roll formulas which are created related to this Item
     * @private
     */
    getRollData()
    {

    }

    /**
     * Handle clickable rolls.
     * @param {Event} event   The originating click event
     * @private
     */
    async roll()
    {
        
    }

    /**
     * Handle toggled booleans and update the item object.
     * @param {String} flag   The name of the boolean to change.
     * @private
     */
    async toggle(flag)
    {
        let field = "";
        let value = null;

        // Use the flag to toggle values as necessary.
        switch(flag)
        {
            case "basic":
                field = "system.basic";
                value = true;
                break;
            case "advanced":
                field = "system.basic";
                value = false;
                break;
            case "group":
                field = "system.group.enabled";
                value = !this.system.group.enabled;
                break;
            case "training_none":
                field = "system.training";
                value = 0;
                break;
            case "training_trained":
                field = "system.training";
                value = 1;
                break;
            case "training_mastery10":
                field = "system.training";
                value = 2;
                break;
            case "training_mastery20":
                field = "system.training";
                value = 3;
                break;
            case "weapon_skill":
            case "ballistic_skill":
            case "strength":
            case "toughness":
            case "agility":
            case "intelligence":
            case "perception":
            case "willpower":
            case "fellowship":
                field = "system.characteristic";
                value = flag;
                break;
            case "crafting":
            case "exploration":
            case "interaction":
            case "investigation":
            case "movement":
            case "operator":
                field = "system.descriptors." + flag;
                value = !this.system.descriptors[flag];
                break;
            default:
                console.log("ROGUE TRADER | Item sheet toggle received an invalid flag.");
        }

        // Update the item with the relevant toggled value.
        if(value !== null)
            await this.update({ [field]: value }).then(item => { return item; })
    }
}

