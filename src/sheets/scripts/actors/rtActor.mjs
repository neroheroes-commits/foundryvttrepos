
export class RTActor extends Actor 
{
    /** @override */
    prepareData() 
    {
        // Prepare data for the actor. Calling the super version of this executes
        // the following, in order: data reset (to clear active effects),
        // prepareBaseData(), prepareEmbeddedDocuments() (including active effects),
        // prepareDerivedData().
        super.prepareData();
    }

    /** 
     * @override 
     */
    prepareBaseData() 
    {
        // Data modifications in this step occur before processing embedded
        // documents or derived data.
    }

    /**
     * @override
     */
    prepareDerivedData() 
    {
        const actorData = this;
        const systemData = actorData.system;

        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        if(actorData.type === "character")
            this._prepareCharacterData(actorData);
    }

    /**
    * Prepare Character type specific data
    */
    _prepareCharacterData(actorData) 
    {
        console.debug("ROGUE TRADER | Preparing derived data for 'character' actor type.");
        
        // Retrieve the system property for ease.
        const systemData = actorData.system;

        console.debug("ROGUE TRADER | Calculate the starting characteristic values.");

        console.log(systemData.characteristics)

        for(let characteristic in systemData.characteristics)
            systemData.characteristics[characteristic].value = systemData.characteristics[characteristic].base;
    }
}
