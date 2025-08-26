## Updating Sheets

This is not really that bad conceptually, but I need to make a note to remind myself how this thing works so I don't waste a ton of my time trying to figure out what's wrong.

Whenever Foundry detects an input element has changed in a sheet, it checks that element and makes sure the value is different. If it is, it does a `sheet.update()` function call. However, presumably to save resources, the `update` accepts a JSON of the change, roughly in the format of

```
{
	path: value;
}
```

Where the path is a system path, such as `system.information.description` and the value is whatever you want stored there in the database, such as "Jim is a great warrior". You can have multiple entries in a JSON, accepted as arrays. I think when Foundry detects an input is changed, it follows this kind of procedure:

1. Detect a change in the sheet when it's edited.
2. Use the locally stored sheet (in the browser) and data to fire `prepareBaseData` and `prepareDerivedData` functions on the item object the sheet represents.
3. Compare the new data to the data stored in the database.
4. Any data which is different is added to a a JSON (in the above format) and passed to an `update` function call, which updates the database in the back end. The data is now persisted.
5. Render the sheet again.

This is great for basic input elements, but if you want to do anything even slightly more interesting, you have to understand that there's a local state and a stored state and those aren't necessarily the same thing.

When I tried adding togglable UI elements, like in the Call of Cthulhu 7th Edition system's item sheets, because *manually changing the values* in a data object is not the same as *triggering an input update* on the sheet, I needed to make sure I noted which data was being changed and, when decided, manually fire my own `update` function call to ensure the data is pushed to the database (check the `RTItem.toggle()` function in `rtItem.mjs` for how to do that).

In addition, data is only loaded into the sheet's UI when a `sheet.render` function is called, which appears to happen automatically in the above procedure, but is separate from the `update` call in practice. This means that once the update is complete, the sheet needs to be re-rendered. When I had to do that for toggling/updating values, the sheet calls the `RTItem.toggle` function and when that function returns, the sheet then calls `this.render`, which is `RTItemSheet.render`. This forces the new data to be shown in the sheet. 

Make sure you follow these steps. If you don't update the database, if your item sheet reloads, it just grabs the data from the database and overwrites any of your local changes.

The update function is inherited down the line from the `Document` class, which may just be a common class for web UI development, so this could simply be a matter of me not knowing enough about web development to "get" this workflow. I find it difficult to tell what is a web-specific design and what is a Foundry-specific design for that reason.

## HTML/CSS Naming Conventions

I thought all HTML elements in the sheet HTML files had to have a `name` field that referenced a field in the sheet's data object (effectively the item data), but it turns out that if you want to change `item.name` on the item, the appropriate `name` field value leaves `item.` off the string. This seems weirdly inconsistent with convention with the `system` data, for example, where the name should be something like `system.strength.value` and the associated `value` in the HTML element should be resolved via handlebars to match, such as `{{system.strength.value}}`. 

At some point when making my item sheets, I had `name="name" value="{{item.name}}"` in the HTML `input` element for changing an item's name, but must've gotten confused and switched it to `name="item.name" value="{{item.name}}"`, which broke my sheet. It took me a very long time to figure out this bug (probably an hour) as I didn't actually consider it a mistake when trying to investigate the problem, as it is consistent with the other HTML elements I was using. It wasn't until I tried changing the `name` property because I had exhausted other options that I figured out the issue.

I haven't tested it any further, but I'm wondering if this applies to all root fields in an item object. At some point there will be a pattern. I just don't know what it is.