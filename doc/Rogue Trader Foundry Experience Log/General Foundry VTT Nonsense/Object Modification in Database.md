Foundry uses Javascript objects to represent Actors and Items. If you change the `template.json` file, Foundry will automatically add the new keys to the relevant objects, but will not remove any keys which are now missing. That means we have to do it manually.

To do so, I simply use the following code:

```javascript
// 0. Make sure the thing you're migrating is the right type and make sure you don't try to migrate anything in an object that's already been migrated.
if(itemData.type === "skill" && "skill_group" in systemData)
{
	// 1. Migrate data from one key to another. When I moved system.skill_group to system.group, I just did an assignment field-by-field.
	systemData.group.enabled = systemData.skill_group.enabled;
	systemData.group.group_name = systemData.skill_group.group_name;

	// 2. Delete the old key if you don't need it anymore.
	delete systemData["skill_group"];

	// 3. Perform updates to the database. I am lazy and just do a full overwrite.
	this.update({ ["system"]: systemData })
}
```

I did about 3 minutes of research to solve this problem, so I may be doing it inefficiently. This is just an "it worked, so I don't care too much" kind of solution.

I ran this code in the `prepareBaseData` function of my Item class because Foundry runs it on every Item in the world when the world is loading, ensuring every time would be checked.